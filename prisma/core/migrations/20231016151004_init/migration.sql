-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "repoId" TEXT NOT NULL,
    "cIId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CI" (
    "id" TEXT NOT NULL,
    "cITypeId" TEXT NOT NULL,

    CONSTRAINT "CI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CIType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "CIType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GitRepo" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "gitRepoCredentialsId" TEXT NOT NULL,

    CONSTRAINT "GitRepo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GitRepoCredentials" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "GitRepoCredentials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CIType_name_key" ON "CIType"("name");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "GitRepo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_cIId_fkey" FOREIGN KEY ("cIId") REFERENCES "CI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CI" ADD CONSTRAINT "CI_cITypeId_fkey" FOREIGN KEY ("cITypeId") REFERENCES "CIType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GitRepo" ADD CONSTRAINT "GitRepo_gitRepoCredentialsId_fkey" FOREIGN KEY ("gitRepoCredentialsId") REFERENCES "GitRepoCredentials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
