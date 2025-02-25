// File: app/api/login/route.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: { json: () => PromiseLike<{ email: any; password: any; }> | { email: any; password: any; }; }) {
  const { email, password } = await req.json();

  try {
    // Debug: Cek koneksi database
    await prisma.$connect();
    console.log('Connected to database');

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log('User found:', user);

    // Jika user tidak ditemukan
    if (!user) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);

    // Jika password tidak valid
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
    }

    // Login berhasil
    return new Response(JSON.stringify({ message: 'Login successful', userId: user.id }), { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(JSON.stringify({ message: 'An error occurred while logging in' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
