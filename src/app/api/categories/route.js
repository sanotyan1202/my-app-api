import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CORSヘッダーを含んだレスポンスを生成する共通関数
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
  const categories = await prisma.category.findMany({
    include: { books: true },
  });
  return createResponse(categories);
}

export async function POST(request) {
  const data = await request.json();
  const newCategory = await prisma.category.create({
    data: { name: data.name },
  });
  return createResponse(newCategory, 201);
}

export async function PUT(request) {
  const data = await request.json();
  const updatedCategory = await prisma.category.update({
    where: { id: data.id },
    data: { name: data.name },
  });
  return createResponse(updatedCategory);
}

export async function DELETE(request) {
  const data = await request.json();
  await prisma.category.delete({
    where: { id: data.id },
  });
  return createResponse({ message: 'Category deleted' });
}

export async function OPTIONS() {
  return createResponse(null, 204);
}