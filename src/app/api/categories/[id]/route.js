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

export async function GET(request, { params }) {
  const { id } = params;

  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
    include: { books: true },
  });

  if (!category) {
    return createResponse({ message: 'Category not found' }, 404);
  }

  return createResponse(category);
}

export async function PUT(request, { params }) {
  const { id } = params;

  const updatedCategory = await prisma.category.update({
    where: { id: Number(id) },
    data: { name: data.name },
  });
  return createResponse(updatedCategory);
}

export async function DELETE(request, { params }) {
  const { id } = params;

  await prisma.category.delete({
    where: { id: Number(id) },
  });
  return createResponse({ message: 'Category deleted' });
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