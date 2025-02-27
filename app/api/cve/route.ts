// File: app/api/cve/route.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Ambil semua CVE atau CVE tertentu berdasarkan ID
export async function GET(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');

      if (id) {
        // Ambil detail CVE berdasarkan id
        const cve = await prisma.cve.findUnique({
          where: { id },
        });

        if (!cve) {
          return new Response(JSON.stringify({ message: 'CVE not found' }), { status: 404 });
        }

        // Validasi dorkingList agar tidak null
        const sanitizedCve = {
          ...cve,
          dorkingList: cve.dorkingList || [],
        };

        return new Response(JSON.stringify(sanitizedCve), { status: 200 });
      }

      // Ambil semua CVE jika tidak ada parameter id
      const cves = await prisma.cve.findMany();
      const sanitizedCves = cves.map((cve) => ({
        ...cve,
        dorkingList: cve.dorkingList || [],
      }));

      return new Response(JSON.stringify(sanitizedCves), { status: 200 });
    } catch (error) {
      console.error('Error fetching CVEs:', error);
      return new Response(JSON.stringify({ message: 'An error occurred while fetching CVEs', error: (error as any).message }), { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
}

// Tambah CVE baru
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

// Update CVE berdasarkan id
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

// Hapus CVE berdasarkan id
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
