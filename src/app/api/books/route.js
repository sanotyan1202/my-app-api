import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const books = await prisma.book.findMany({
    include: { category: true },
  });
  return new Response(JSON.stringify(books), { status: 200 });
}

export async function POST(request) {
  const data = await request.json();
  const newBook = await prisma.book.create({
    data: { title: data.title, categoryId: data.categoryId },
  });
  return new Response(JSON.stringify(newBook), { status: 201 });
}

export async function PUT(request) {
  const data = await request.json();
  const updatedBook = await prisma.book.update({
    where: { id: data.id },
    data: { title: data.title, categoryId: data.categoryId },
  });
  return new Response(JSON.stringify(updatedBook), { status: 200 });
}

export async function DELETE(request) {
  const data = await request.json();
  await prisma.book.delete({
    where: { id: data.id },
  });
  return new Response(JSON.stringify({ message: 'Book deleted' }), { status: 200 });
}