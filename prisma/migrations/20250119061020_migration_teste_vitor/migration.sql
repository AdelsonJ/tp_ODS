/*
  Warnings:

  - You are about to drop the column `categoria` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `class_indicativa` on the `Evento` table. All the data in the column will be lost.
  - Added the required column `id_categoria` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "categoria",
DROP COLUMN "class_indicativa",
ADD COLUMN     "id_categoria" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
