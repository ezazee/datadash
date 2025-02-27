const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Tambahkan user ke database
  const user = await prisma.user.create({
    data: {
      name: 'datadash',
      email: 'datadash@gmail.com',
      password: hashedPassword,
    },
  });

  console.log(`Created user: ${user.email}`);
}

main()
  .then(() => {
    console.log('Seeding completed.');
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
