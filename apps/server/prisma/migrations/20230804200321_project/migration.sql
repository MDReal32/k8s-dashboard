-- CreateTable
CREATE TABLE "ProjectRepository" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "ssh" BOOLEAN NOT NULL,

    CONSTRAINT "ProjectRepository_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCi" (
    "id" TEXT NOT NULL,
    "dir" TEXT NOT NULL,
    "provider" TEXT NOT NULL,

    CONSTRAINT "ProjectCi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "repoId" TEXT NOT NULL,
    "ciId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_repoId_key" ON "Project"("repoId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_ciId_key" ON "Project"("ciId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "ProjectRepository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ciId_fkey" FOREIGN KEY ("ciId") REFERENCES "ProjectCi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
