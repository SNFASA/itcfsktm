-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Eligibility" AS ENUM ('Open', 'FacultyStudents', 'MembersOnly');

-- CreateEnum
CREATE TYPE "GallerySize" AS ENUM ('small', 'medium', 'large');

-- CreateEnum
CREATE TYPE "ExcoCategory" AS ENUM ('ExcoMT', 'ExcoSukan', 'ExcoMedia', 'ExcoAkademik', 'ExcoKebajikan', 'ExcoKeusahawanan', 'ExcoKerohanian', 'ExcoLuar', 'ExcoPenerbitan', 'ExcoICT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT,
    "time" TEXT,
    "location" TEXT,
    "eligibility" "Eligibility" NOT NULL,
    "agenda" TEXT,
    "isFree" BOOLEAN NOT NULL DEFAULT true,
    "hasCertificate" BOOLEAN NOT NULL DEFAULT false,
    "hasRefreshments" BOOLEAN NOT NULL DEFAULT false,
    "isLimited" BOOLEAN NOT NULL DEFAULT false,
    "transportation" BOOLEAN NOT NULL DEFAULT false,
    "accommodation" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsItem" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "image" TEXT,
    "category" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "readTime" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "NewsItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryEvent" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mainImage" TEXT NOT NULL,
    "additionalImages" TEXT[],
    "category" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "size" "GallerySize" NOT NULL,
    "rotation" INTEGER NOT NULL,
    "location" TEXT,
    "attendees" INTEGER,
    "tags" TEXT[],

    CONSTRAINT "GalleryEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaItem" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uploadedBy" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "MediaItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dean" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Dean_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "image" TEXT,
    "excoId" TEXT,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExcoSection" (
    "id" TEXT NOT NULL,
    "category" "ExcoCategory" NOT NULL,
    "headId" TEXT,

    CONSTRAINT "ExcoSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "NewsItem_slug_key" ON "NewsItem"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ExcoSection_headId_key" ON "ExcoSection"("headId");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_excoId_fkey" FOREIGN KEY ("excoId") REFERENCES "ExcoSection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExcoSection" ADD CONSTRAINT "ExcoSection_headId_fkey" FOREIGN KEY ("headId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
