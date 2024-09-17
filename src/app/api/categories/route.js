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