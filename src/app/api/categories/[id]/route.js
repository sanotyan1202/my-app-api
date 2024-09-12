import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = params;

  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
    include: { books: true },
  });

  if (!category) {
    return new Response(JSON.stringify({ message: 'Category not found' }), { status: 404 });
  }

  return new Response(JSON.stringify(category), { status: 200 });
}