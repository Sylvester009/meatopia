GRANT SELECT ON "site_control_settings" TO anon, authenticated;

DROP POLICY IF EXISTS "Public can read site control settings"
    ON "site_control_settings";
CREATE POLICY "Public can read site control settings"
    ON "site_control_settings"
    FOR SELECT
    TO anon, authenticated
    USING (true);
