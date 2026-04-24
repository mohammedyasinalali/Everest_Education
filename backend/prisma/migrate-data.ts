import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// A simple way to get data is to require the TS file, but to avoid TS config issues, we can read the file and use a simple parsing or just compile it on the fly.
// Actually, ts-node allows requiring TS files out of rootDir if we configure it or just use it.
// Let's try requiring it directly. If it fails, we will use another method.

async function main() {
  console.log('Registering ts-node...');
  require('ts-node').register({ transpileOnly: true });

  console.log('Importing frontend constants...');
  const ts = require('typescript');
  const blogsPath = path.resolve(__dirname, '../../everest/src/constants/blogs.ts');
  const univsPath = path.resolve(__dirname, '../../everest/src/constants/universities.ts');
  
  const blogsCode = fs.readFileSync(blogsPath, 'utf8');
  const univsCode = fs.readFileSync(univsPath, 'utf8');

  // Transpile TS to JS and evaluate in a sandbox
  const transpile = (code: string) => ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  
  const blogsJs = transpile(blogsCode);
  const univsJs = transpile(univsCode);

  const blogsExports: any = {};
  const univsExports: any = {};

  // Evaluate the transpiled code
  new Function('exports', blogsJs)(blogsExports);
  new Function('exports', univsJs)(univsExports);

  const blogPosts = blogsExports.blogPosts;
  const universities = univsExports.universities;

  console.log(`Found ${blogPosts.length} blogs and ${universities.length} universities.`);

  // Migrate Blogs
  console.log('Migrating blogs...');
  // Group blogs by slug because mock data has different entries per language for the same slug sometimes?
  // Wait! In mock data, blogPosts is an array where each post has a specific lang, but they have different slugs for different languages?
  // Let's check: slug: 'study-medicine-in-turkey', lang: 'ar'.
  // We'll create one blog per post, or group by slug. Let's group by slug!
  const blogsBySlug: Record<string, any> = {};
  for (const post of blogPosts) {
    if (!blogsBySlug[post.slug]) {
      blogsBySlug[post.slug] = {
        slug: post.slug,
        coverImage: post.image,
        published: true,
        translations: []
      };
    }
    blogsBySlug[post.slug].translations.push({
      locale: post.lang,
      title: post.title,
      content: post.content || post.excerpt
    });
  }

  for (const slug of Object.keys(blogsBySlug)) {
    const data = blogsBySlug[slug];
    await prisma.blog.upsert({
      where: { slug },
      update: {},
      create: {
        slug: data.slug,
        coverImage: data.coverImage,
        published: data.published,
        translations: {
          create: data.translations
        }
      }
    });
    console.log(`- Created blog: ${slug}`);
  }

  // Migrate Universities
  console.log('Migrating universities...');
  for (const u of universities) {
    // universities have .name which is Record<string, string> {ar: '...', en: '...'}
    // same for description.
    const translations = [];
    const locales = Object.keys(u.name || {});
    for (const locale of locales) {
      translations.push({
        locale,
        name: u.name[locale],
        description: u.description?.[locale] || ''
      });
    }

    await prisma.university.upsert({
      where: { slug: u.id },
      update: {},
      create: {
        slug: u.id,
        logoImage: u.logo,
        country: u.country,
        city: u.city?.ar || u.city?.en || '',
        published: true,
        translations: {
          create: translations
        }
      }
    });
    console.log(`- Created university: ${u.id}`);
  }

  console.log('✅ Migration completed successfully!');
}

main()
  .catch(e => {
    console.error('Error during migration:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
