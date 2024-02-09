-- CreateEnum
CREATE TYPE "GuitarType" AS ENUM ('acoustic', 'electric', 'ukulele');

-- CreateTable
CREATE TABLE "guitars" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageUrl" TEXT NOT NULL,
    "type" "GuitarType" NOT NULL,
    "vendor_code" TEXT NOT NULL,
    "number_of_strings" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "author_id" TEXT NOT NULL,

    CONSTRAINT "guitars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guitars_id_key" ON "guitars"("id");
