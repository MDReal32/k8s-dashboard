/*
  Warnings:

  - The `provider` column on the `ProjectCi` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('NONE', 'DOCKER', 'DOCKER_COMPOSE', 'HELM', 'KUBERNETES', 'K8S');

-- AlterTable
ALTER TABLE "ProjectCi" DROP COLUMN "provider",
ADD COLUMN     "provider" "Provider" NOT NULL DEFAULT 'NONE';
