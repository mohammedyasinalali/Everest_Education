import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@everest-education.org' },
    update: {},
    create: {
      email: 'admin@everest-education.org',
      password: hashedPassword,
    },
  });

  console.log('✅ Admin created:', admin.email);
  console.log('📧 Email: admin@everest-education.org');
  console.log('🔑 Password: admin123');
  console.log('⚠️  Please change the password after first login!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
