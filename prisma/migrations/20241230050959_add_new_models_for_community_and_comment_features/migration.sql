/*
  Warnings:

  - The `access` column on the `Join` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CommunityAccess" AS ENUM ('CONTRIBUTOR', 'BANNED', 'SHADOWED', 'TRUSTED', 'MODERATOR');

-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('PUBLISHED', 'PENDING', 'DELETED', 'SPAM');

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "status" "CommentStatus" NOT NULL DEFAULT 'PUBLISHED';

-- AlterTable
ALTER TABLE "Join" DROP COLUMN "access",
ADD COLUMN     "access" "CommunityAccess" NOT NULL DEFAULT 'CONTRIBUTOR';

-- DropEnum
DROP TYPE "CommunityRole";

-- CreateTable
CREATE TABLE "CommentReport" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reason" TEXT NOT NULL DEFAULT 'Other',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommentReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommentReport" ADD CONSTRAINT "CommentReport_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReport" ADD CONSTRAINT "CommentReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
