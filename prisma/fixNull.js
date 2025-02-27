// File: scripts/fixNull.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixNull() {
  try {
    const updated = await prisma.cve.updateMany({
      where: { dorkingList: null },
      data: { dorkingList: [] },
    });

    console.log(`✅ Fixed ${updated.count} records with null dorkingList.`);
  } catch (error) {
    console.error('❌ Error fixing null values:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixNull();
