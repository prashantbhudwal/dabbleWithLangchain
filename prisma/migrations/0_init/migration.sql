-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "vector" vector,
    "namespace" TEXT DEFAULT 'default',
    "name" TEXT,
    "secondName" TEXT,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

