import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { createRequire } from 'module';
import * as ts from 'typescript';

const prisma = new PrismaClient();
const requireContext = createRequire(import.meta.url);

async function main() {
  const constantsPath = path.resolve(__dirname, '../../everest/src/constants/specialties.ts');
  const sourceCode = fs.readFileSync(constantsPath, 'utf8');

  // Transpile to CommonJS
  const transpiled = ts.transpileModule(sourceCode, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });

  const tempFilePath = path.resolve(__dirname, 'temp-specialties.js');
  fs.writeFileSync(tempFilePath, transpiled.outputText);

  let specialtiesMock: any[] = [];
  try {
    const imported = requireContext(tempFilePath);
    specialtiesMock = imported.allSpecialties || [];
  } catch (error) {
    console.error('Failed to import specialties:', error);
  } finally {
    if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
  }

  if (specialtiesMock.length === 0) {
    console.log('No specialties found in mock.');
    return;
  }

  console.log(`Found ${specialtiesMock.length} specialties.`);

  for (const item of specialtiesMock) {
    // 1. Arabic record
    await prisma.specialty.upsert({
      where: { slug_locale: { slug: item.id, locale: 'ar' } },
      update: {},
      create: {
        slug: item.id,
        locale: 'ar',
        name: item.name,
        category: item.category,
        icon: item.icon,
        color: item.color,
        image: item.image,
        duration: item.duration,
        language: item.language,
        description: item.description,
        tags: item.tags?.join(',') || '',
        published: true,
      }
    });

    // 2. English record
    await prisma.specialty.upsert({
      where: { slug_locale: { slug: item.id, locale: 'en' } },
      update: {},
      create: {
        slug: item.id,
        locale: 'en',
        name: item.nameEn || item.name,
        category: item.category,
        icon: item.icon,
        color: item.color,
        image: item.image,
        duration: item.duration,
        language: item.language,
        description: item.description,
        tags: item.tags?.join(',') || '',
        published: true,
      }
    });
    console.log(`- Migrated AR & EN specialty: ${item.id}`);
  }

  console.log('Migration completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
