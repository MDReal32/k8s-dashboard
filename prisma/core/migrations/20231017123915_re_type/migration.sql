/*
  Warnings:

  - You are about to drop the column `cIId` on the `Project` table. All the data in the column will be lost.
  - Added the required column `ciId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_cIId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "cIId",
ADD COLUMN     "ciId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ciId_fkey" FOREIGN KEY ("ciId") REFERENCES "CI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
