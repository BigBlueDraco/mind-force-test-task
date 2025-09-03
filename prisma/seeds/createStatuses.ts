import { Prisma, PrismaClient, Status } from '@prisma/client';
const prisma = new PrismaClient();

const NEW_STATUS: Prisma.StatusCreateInput = {
  id: 'c3d4e5f6-a7b8-9012-3456-7890abcdef01',
  name: 'new',
};
const IN_PROGRESS_STATUS: Prisma.StatusCreateInput = {
  id: 'd4e5f6a7-b8c9-0123-4567-890abcdef012',
  name: 'in_progress',
};

const DONE_STATUS: Prisma.StatusCreateInput = {
  id: 'f6a7b8c9-d0e1-2345-6789-0abcdef01234',
  name: 'done',
};

export async function createStatuses() {
  return await prisma.status.create({
    data: {
      ...NEW_STATUS,
      next: {
        create: {
          ...IN_PROGRESS_STATUS,
          next: {
            create: {
              ...DONE_STATUS,
            },
          },
        },
      },
    },
  });
}
