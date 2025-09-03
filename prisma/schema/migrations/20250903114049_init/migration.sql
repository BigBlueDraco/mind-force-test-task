-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('NEW', 'IN_PROGRESS', 'DONE');

-- CreateTable
CREATE TABLE "public"."Request" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'NEW',

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);
