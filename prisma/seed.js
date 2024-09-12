const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // カテゴリとブックのデータを作成
  const category1 = await prisma.category.create({
    data: {
      name: 'Programming',
      books: {
        create: [
          { title: 'Learn JavaScript' },
          { title: 'Mastering Python' },
        ],
      },
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Fiction',
      books: {
        create: [
          { title: 'The Great Gatsby' },
          { title: '1984' },
        ],
      },
    },
  });

  console.log('Seed data added');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
