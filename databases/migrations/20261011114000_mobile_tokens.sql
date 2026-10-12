CREATE TABLE employee_tokens (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    token_hash CHAR(64) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    last_used_at TIMESTAMP NULL DEFAULT NULL,
    revoked_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY uq_employee_tokens_hash (token_hash),
    KEY idx_employee_tokens_employee (employee_id),
    KEY idx_employee_tokens_expiry (expires_at),

    CONSTRAINT fk_employee_tokens_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;