/*
  Warnings:

  - Made the column `imagem` on table `Categoria` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Categoria" ALTER COLUMN "imagem" SET NOT NULL;
