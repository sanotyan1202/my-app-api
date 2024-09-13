import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function createResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET(request) {
  const books = await prisma.book.findMany({ include: { category: true } });
  return createResponse(books);
}

export async function POST(request) {
  const data = await request.json();
  const newBook = await prisma.book.create({
    data: { title: data.title, categoryId: data.categoryId },
  });
  return createResponse(newBook, 201);
}

export async function PUT(request) {
  const data = await request.json();
  const updatedBook = await prisma.book.update({
    where: { id: data.id },
    data: { title: data.title, categoryId: data.categoryId },
  });
  return createResponse(updatedBook);
}

export async function DELETE(request) {
  const data = await request.json();
  await prisma.book.delete({ where: { id: data.id } });
  return createResponse({ message: 'Book deleted' });
}

export async function OPTIONS() {
  return createResponse(null, 204);
}