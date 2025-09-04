import { Prisma, PrismaClient, Status } from '@prisma/client';
const prisma = new PrismaClient();

export const DEFAULT_REQUEST_TYPE: Prisma.TypeCreateInput = {
  id: '14dd96f5-bbd6-4e19-a3f1-9a935e79350a',
  name: 'default',
};

export async function createTypes() {
  return await prisma.type.create({ data: DEFAULT_REQUEST_TYPE });
}
