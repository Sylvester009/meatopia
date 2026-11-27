ALTER TABLE "products" ADD COLUMN "slug" TEXT;

DO $$
DECLARE
    product_record RECORD;
    base_slug TEXT;
    candidate_slug TEXT;
    suffix INTEGER;
BEGIN
    FOR product_record IN SELECT "id", "name" FROM "products" ORDER BY "id" LOOP
        base_slug := COALESCE(
            NULLIF(
                TRIM(BOTH '-' FROM REGEXP_REPLACE(LOWER(product_record."name"), '[^a-z0-9]+', '-', 'g')),
                ''
            ),
            'product'
        );
        candidate_slug := base_slug;
        suffix := 2;

        WHILE EXISTS (SELECT 1 FROM "products" WHERE "slug" = candidate_slug) LOOP
            candidate_slug := base_slug || '-' || suffix;
            suffix := suffix + 1;
        END LOOP;

        UPDATE "products"
        SET "slug" = candidate_slug
        WHERE "id" = product_record."id";
    END LOOP;
END $$;

ALTER TABLE "products" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");
