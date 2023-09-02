/*
  Warnings:

  - You are about to drop the column `description` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Review` table. All the data in the column will be lost.
  - Added the required column `review` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "description",
DROP COLUMN "type",
ALTER COLUMN "ratingValue" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "rating",
ADD COLUMN     "review" TEXT NOT NULL;

-- DropEnum
DROP TYPE "RatingType";
