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

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}