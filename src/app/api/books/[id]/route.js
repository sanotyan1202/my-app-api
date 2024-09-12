import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = params;

  const book = await prisma.book.findUnique({
    where: { id: Number(id) },
    include: { category: true },
  });

  if (!book) {
    return new Response(JSON.stringify({ message: 'Book not found' }), { status: 404 });
  }

  return new Response(JSON.stringify(book), { status: 200 });
}