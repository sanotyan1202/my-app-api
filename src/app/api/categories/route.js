import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const categories = await prisma.category.findMany({
    include: { books: true },
  });
  return new Response(JSON.stringify(categories), { status: 200 });
}

export async function POST(request) {
  const data = await request.json();
  const newCategory = await prisma.category.create({
    data: { name: data.name },
  });
  return new Response(JSON.stringify(newCategory), { status: 201 });
}

export async function PUT(request) {
  const data = await request.json();
  const updatedCategory = await prisma.category.update({
    where: { id: data.id },
    data: { name: data.name },
  });
  return new Response(JSON.stringify(updatedCategory), { status: 200 });
}

export async function DELETE(request) {
  const data = await request.json();
  await prisma.category.delete({
    where: { id: data.id },
  });
  return new Response(JSON.stringify({ message: 'Category deleted' }), { status: 200 });
}