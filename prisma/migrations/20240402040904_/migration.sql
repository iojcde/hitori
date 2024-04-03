/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NoteToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_NoteToTag" DROP CONSTRAINT "_NoteToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_NoteToTag" DROP CONSTRAINT "_NoteToTag_B_fkey";

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_NoteToTag";