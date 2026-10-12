ALTER TABLE attendances
    ADD COLUMN is_late TINYINT(1) NOT NULL DEFAULT 0
        AFTER status,
    ADD COLUMN late_minutes SMALLINT UNSIGNED NOT NULL DEFAULT 0
        AFTER is_late;