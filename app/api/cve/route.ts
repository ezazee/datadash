// File: app/api/cve/route.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
      const cves = await prisma.cve.findMany();

      // Validasi untuk mengatasi null pada dorkingList
      const sanitizedCves = cves.map((cve) => ({
        ...cve,
        dorkingList: cve.dorkingList || [], // Ganti null dengan array kosong
      }));

      return new Response(JSON.stringify(sanitizedCves), { status: 200 });
    } catch (error) {
      console.error('Error fetching CVEs:', error);
      return new Response(JSON.stringify({ message: 'An error occurred while fetching CVEs', error: (error as any).message }), { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const newCve = await prisma.cve.create({
      data,
    });

    return new Response(JSON.stringify(newCve), { status: 201 });
  } catch (error) {
    console.error('❌ Error creating CVE:', error);
    return new Response(JSON.stringify({ message: 'An error occurred while creating CVE', error: (error as any).message }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();

    const updatedCve = await prisma.cve.update({
      where: { id: data.id },
      data,
    });

    return new Response(JSON.stringify(updatedCve), { status: 200 });
  } catch (error) {
    console.error('❌ Error updating CVE:', error);
    return new Response(JSON.stringify({ message: 'An error occurred while updating CVE', error: (error as any).message }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 });
    }

    const deletedCve = await prisma.cve.delete({
      where: { id },
    });

    return new Response(JSON.stringify(deletedCve), { status: 200 });
  } catch (error) {
    console.error('❌ Error deleting CVE:', error);
    return new Response(JSON.stringify({ message: 'An error occurred while deleting CVE', error: (error as any).message }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
