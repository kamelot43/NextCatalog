-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "priceRub" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'RUB',
    "image" TEXT,
    "powerHp" INTEGER NOT NULL,
    "transmission" TEXT NOT NULL,
    "drive" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Product_brand_idx" ON "Product"("brand");

-- CreateIndex
CREATE INDEX "Product_brand_category_idx" ON "Product"("brand", "category");

-- CreateIndex
CREATE INDEX "Product_brand_year_idx" ON "Product"("brand", "year");

-- CreateIndex
CREATE UNIQUE INDEX "Product_brand_slug_key" ON "Product"("brand", "slug");
