import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await Promise.all([
    prisma.status.createMany({
      data: [
        { status: 'Idle' },
        { status: 'To Do' },
        { status: 'In Progress' },
        { status: 'Done' },
        { status: 'Blocked' },
      ],
      skipDuplicates: true,
    }),
  ]);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
