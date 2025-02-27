import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Ambil userId dari header
    const userId = request.headers.get('userId');

    // Validasi userId
    if (!userId) {
      return NextResponse.json({ message: 'UserId diperlukan di header' }, { status: 400 });
    }

    // Cari user berdasarkan userId
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Jika user tidak ditemukan
    if (!user) {
      return NextResponse.json({ message: 'User tidak ditemukan' }, { status: 404 });
    }

    // Berhasil mendapatkan data user
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error saat mengambil profil:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan saat mengambil profil' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
