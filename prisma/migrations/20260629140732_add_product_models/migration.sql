-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "tag" TEXT,
    "tagColor" TEXT,
    "rating" DOUBLE PRECISION,
    "reviewsCount" INTEGER NOT NULL DEFAULT 0,
    "weightUnit" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "icon" TEXT,
    "label" TEXT NOT NULL,
    "color" TEXT,
    "productId" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cooking_tips" (
    "id" SERIAL NOT NULL,
    "tip" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "cooking_tips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutritional_info" (
    "id" SERIAL NOT NULL,
    "info" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "nutritional_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weight_options" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "multiplier" DOUBLE PRECISION NOT NULL,
    "image" TEXT,
    "productId" TEXT NOT NULL,

    CONSTRAINT "weight_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cooking_tips" ADD CONSTRAINT "cooking_tips_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutritional_info" ADD CONSTRAINT "nutritional_info_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weight_options" ADD CONSTRAINT "weight_options_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
