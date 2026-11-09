CREATE TABLE IF NOT EXISTS "site_control_settings" (
    "id" TEXT NOT NULL DEFAULT 'global',
    "seo_settings" JSONB NOT NULL DEFAULT '{}'::JSONB,
    "accessibility_settings" JSONB NOT NULL DEFAULT '{}'::JSONB,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" UUID,

    CONSTRAINT "site_control_settings_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "site_control_settings_id_check" CHECK ("id" = 'global')
);

ALTER TABLE "site_control_settings" ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE ON "site_control_settings" TO authenticated;

DROP POLICY IF EXISTS "Admins can read site control settings"
    ON "site_control_settings";
CREATE POLICY "Admins can read site control settings"
    ON "site_control_settings"
    FOR SELECT
    TO authenticated
    USING (
        COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
        OR LOWER(COALESCE(auth.jwt() ->> 'email', '')) = 'meatopia.ng@gmail.com'
    );

DROP POLICY IF EXISTS "Admins can insert site control settings"
    ON "site_control_settings";
CREATE POLICY "Admins can insert site control settings"
    ON "site_control_settings"
    FOR INSERT
    TO authenticated
    WITH CHECK (
        COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
        OR LOWER(COALESCE(auth.jwt() ->> 'email', '')) = 'meatopia.ng@gmail.com'
    );

DROP POLICY IF EXISTS "Admins can update site control settings"
    ON "site_control_settings";
CREATE POLICY "Admins can update site control settings"
    ON "site_control_settings"
    FOR UPDATE
    TO authenticated
    USING (
        COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
        OR LOWER(COALESCE(auth.jwt() ->> 'email', '')) = 'meatopia.ng@gmail.com'
    )
    WITH CHECK (
        COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
        OR LOWER(COALESCE(auth.jwt() ->> 'email', '')) = 'meatopia.ng@gmail.com'
    );
