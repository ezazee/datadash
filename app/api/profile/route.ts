// File: app/api/profile/route.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: { headers: { get: (arg0: string) => any; }; }) {
  const userId = req.headers.get('userId');

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return new Response(JSON.stringify({ message: 'An error occurred while fetching profile' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
