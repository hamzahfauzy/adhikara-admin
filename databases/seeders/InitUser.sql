START TRANSACTION;

-- 1. Buat user superadmin
INSERT INTO users (
    name,
    email,
    username,
    password,
    is_active,
    created_by,
    created_at,
    updated_at
) VALUES (
    'Super Administrator',
    'superadmin@example.com',
    'superadmin',
    '$2y$10$/4lFt9cldSUpQapbb1ECT./whjzK6o/HaF42/zjyZ/dMXLRIfHgMi',
    1,
    1,
    NOW(),
    NOW()
);

SET @user_id = LAST_INSERT_ID();


-- 2. Buat role Super Admin
INSERT INTO roles (
    name,
    slug,
    description,
    created_at,
    updated_at
) VALUES (
    'Super Admin',
    'super-admin',
    'Role dengan akses penuh ke seluruh fitur aplikasi.',
    NOW(),
    NOW()
)
ON DUPLICATE KEY UPDATE
    id = LAST_INSERT_ID(id);

SET @role_id = LAST_INSERT_ID();


-- 3. Buat permission wildcard *
INSERT INTO permissions (
    name,
    group_name,
    slug,
    description,
    created_at,
    updated_at
) VALUES (
    'All Permissions',
    'system',
    '*',
    'Akses penuh ke seluruh modul dan aksi aplikasi.',
    NOW(),
    NOW()
)
ON DUPLICATE KEY UPDATE
    id = LAST_INSERT_ID(id);

SET @permission_id = LAST_INSERT_ID();


-- 4. Hubungkan role Super Admin dengan permission *
INSERT IGNORE INTO role_permissions (
    role_id,
    permission_id
) VALUES (
    @role_id,
    @permission_id
);


-- 5. Hubungkan user dengan role Super Admin
INSERT IGNORE INTO user_roles (
    user_id,
    role_id
) VALUES (
    @user_id,
    @role_id
);

COMMIT;