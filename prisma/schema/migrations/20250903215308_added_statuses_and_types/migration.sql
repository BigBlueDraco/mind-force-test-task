/*
  Warnings:

  - You are about to drop the column `status` on the `Request` table. All the data in the column will be lost.
  - Added the required column `statusId` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Request" DROP COLUMN "status",
ADD COLUMN     "statusId" TEXT NOT NULL,
ADD COLUMN     "typeId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "public"."Status";

-- CreateTable
CREATE TABLE "public"."Status" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nextStatusId" TEXT,
    "prevStatusId" TEXT,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Status_nextStatusId_key" ON "public"."Status"("nextStatusId");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "public"."Type"("name");

-- AddForeignKey
ALTER TABLE "public"."Request" ADD CONSTRAINT "Request_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "public"."Status"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Request" ADD CONSTRAINT "Request_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "public"."Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Status" ADD CONSTRAINT "Status_nextStatusId_fkey" FOREIGN KEY ("nextStatusId") REFERENCES "public"."Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
