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

  const book = await prisma.book.findUnique({
    where: { id: Number(id) },
    include: { category: true },
  });

  if (!book) {
    return createResponse({ message: 'Book not found' }, 404);
  }

  return createResponse(book);
}

export async function OPTIONS() {
  return createResponse(null, 204);
}
