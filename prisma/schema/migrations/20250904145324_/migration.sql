/*
  Warnings:

  - You are about to drop the column `prevStatusId` on the `Status` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Status" DROP COLUMN "prevStatusId";
