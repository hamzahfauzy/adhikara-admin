
CREATE TABLE clients (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(150) NOT NULL,
    pic_name VARCHAR(150) NULL,
    phone VARCHAR(30) NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    updated_by BIGINT UNSIGNED NULL,

    UNIQUE KEY uq_clients_code (code),
    KEY idx_clients_name (name),
    KEY idx_clients_status (status),

    CONSTRAINT chk_clients_status
        CHECK (status IN ('active', 'inactive'))
) ENGINE=InnoDB;

CREATE TABLE employees (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    identity_number VARCHAR(50) NULL,
    name VARCHAR(150) NOT NULL,
    gender VARCHAR(20) NULL,
    phone VARCHAR(30) NULL,
    join_date DATE NOT NULL,
    address TEXT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',

    username VARCHAR(150) NOT NULL,
    password_hash VARCHAR(150) NOT NULL,
    last_login_at DATETIME NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    updated_by BIGINT UNSIGNED NULL,

    UNIQUE KEY uq_employees_code (code),
    UNIQUE KEY uq_employees_identity (identity_number),
    KEY idx_employees_name (name),
    KEY idx_employees_phone (phone),
    KEY idx_employees_status (status),

    CONSTRAINT chk_employees_gender
        CHECK (gender IS NULL OR gender IN ('male', 'female')),
    CONSTRAINT chk_employees_status
        CHECK (status IN ('active', 'inactive', 'resigned'))
) ENGINE=InnoDB;

CREATE TABLE shifts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    late_tolerance_minutes SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'active',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    updated_by BIGINT UNSIGNED NULL,

    UNIQUE KEY uq_shifts_code (code),
    KEY idx_shifts_status (status),

    CONSTRAINT chk_shifts_status
        CHECK (status IN ('active', 'inactive'))
) ENGINE=InnoDB;

CREATE TABLE placements (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    client_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(150) NOT NULL,
    position VARCHAR(100) NULL,

    lat VARCHAR(100) NOT NULL,
    lng VARCHAR(100) NOT NULL,
    radius INT UNSIGNED NOT NULL DEFAULT 100,

    start_date DATE NOT NULL,
    end_date DATE NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    updated_by BIGINT UNSIGNED NULL,

    KEY idx_placements_employee (employee_id),
    KEY idx_placements_client (client_id),
    KEY idx_placements_period (start_date, end_date),
    KEY idx_placements_status (status),

    CONSTRAINT fk_placements_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_placements_client
        FOREIGN KEY (client_id)
        REFERENCES clients(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT chk_placements_lat
        CHECK (lat BETWEEN -90 AND 90),
    CONSTRAINT chk_placements_lng
        CHECK (lng BETWEEN -180 AND 180),
    CONSTRAINT chk_placements_radius
        CHECK (radius > 0),
    CONSTRAINT chk_placements_period
        CHECK (end_date IS NULL OR end_date >= start_date),
    CONSTRAINT chk_placements_status
        CHECK (status IN ('active', 'inactive', 'ended'))
) ENGINE=InnoDB;

CREATE TABLE schedules (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    placement_id BIGINT UNSIGNED NOT NULL,
    shift_id BIGINT UNSIGNED NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'scheduled',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    updated_by BIGINT UNSIGNED NULL,

    UNIQUE KEY uq_schedules_employee_date_shift
        (employee_id, date, shift_id),

    KEY idx_schedules_date_status (date, status),
    KEY idx_schedules_placement_date (placement_id, date),
    KEY idx_schedules_shift (shift_id),

    CONSTRAINT fk_schedules_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_schedules_placement
        FOREIGN KEY (placement_id)
        REFERENCES placements(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_schedules_shift
        FOREIGN KEY (shift_id)
        REFERENCES shifts(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT chk_schedules_status
        CHECK (status IN ('scheduled', 'cancelled', 'day_off'))
) ENGINE=InnoDB;


CREATE TABLE attendance_requests (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    placement_id BIGINT UNSIGNED NOT NULL,
    schedule_id BIGINT UNSIGNED NULL,

    start_at DATETIME NOT NULL,
    end_at DATETIME NOT NULL,

    record_type VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    notes TEXT NULL,
    file_url VARCHAR(500) NULL,

    reviewed_by BIGINT UNSIGNED NULL,
    reviewed_at DATETIME NULL,
    rejection_reason TEXT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    updated_by BIGINT UNSIGNED NULL,

    KEY idx_requests_employee_period
        (employee_id, start_at, end_at),
    KEY idx_requests_status_type (status, record_type),
    KEY idx_requests_placement (placement_id),
    KEY idx_requests_schedule (schedule_id),
    KEY idx_requests_created (created_at),

    CONSTRAINT fk_requests_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_requests_placement
        FOREIGN KEY (placement_id)
        REFERENCES placements(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_requests_schedule
        FOREIGN KEY (schedule_id)
        REFERENCES schedules(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_requests_reviewer
        FOREIGN KEY (reviewed_by)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT chk_requests_type
        CHECK (record_type IN ('leave', 'duty')),

    CONSTRAINT chk_requests_status
        CHECK (status IN ('pending', 'approved', 'rejected')),

    CONSTRAINT chk_requests_period
        CHECK (end_at > start_at)
) ENGINE=InnoDB;

CREATE TABLE attendances (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    request_id BIGINT UNSIGNED NULL,
    employee_id BIGINT UNSIGNED NOT NULL,
    placement_id BIGINT UNSIGNED NOT NULL,
    schedule_id BIGINT UNSIGNED NULL,

    attendance_date DATE NOT NULL,
    start_at DATETIME NULL,
    end_at DATETIME NULL,

    start_lat DECIMAL(10,7) NULL,
    start_lng DECIMAL(10,7) NULL,
    end_lat DECIMAL(10,7) NULL,
    end_lng DECIMAL(10,7) NULL,

    start_photo_url VARCHAR(500) NULL,
    end_photo_url VARCHAR(500) NULL,

    record_type VARCHAR(20) NOT NULL DEFAULT 'presence',
    status VARCHAR(20) NOT NULL DEFAULT 'approved',
    notes TEXT NULL,
    file_url VARCHAR(500) NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    updated_by BIGINT UNSIGNED NULL,

    -- Satu presensi per jadwal.
    -- NULL diperbolehkan untuk attendance yang tidak terikat jadwal.
    UNIQUE KEY uq_attendances_schedule (schedule_id),

    -- Mencegah satu request menghasilkan dua record
    -- untuk tanggal yang sama.
    UNIQUE KEY uq_attendances_request_date
        (request_id, attendance_date),

    KEY idx_attendances_employee_date
        (employee_id, attendance_date),
    KEY idx_attendances_date_type_status
        (attendance_date, record_type, status),
    KEY idx_attendances_placement_date
        (placement_id, attendance_date),
    KEY idx_attendances_start_at (start_at),
    KEY idx_attendances_created (created_at),

    CONSTRAINT fk_attendances_request
        FOREIGN KEY (request_id)
        REFERENCES attendance_requests(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_attendances_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_attendances_placement
        FOREIGN KEY (placement_id)
        REFERENCES placements(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_attendances_schedule
        FOREIGN KEY (schedule_id)
        REFERENCES schedules(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT chk_attendances_type
        CHECK (record_type IN ('presence', 'leave', 'duty')),

    CONSTRAINT chk_attendances_status
        CHECK (status IN ('approved', 'pending', 'rejected')),

    CONSTRAINT chk_attendances_period
        CHECK (
            start_at IS NULL
            OR end_at IS NULL
            OR end_at >= start_at
        ),

    CONSTRAINT chk_attendances_start_lat
        CHECK (start_lat IS NULL OR start_lat BETWEEN -90 AND 90),

    CONSTRAINT chk_attendances_start_lng
        CHECK (start_lng IS NULL OR start_lng BETWEEN -180 AND 180),

    CONSTRAINT chk_attendances_end_lat
        CHECK (end_lat IS NULL OR end_lat BETWEEN -90 AND 90),

    CONSTRAINT chk_attendances_end_lng
        CHECK (end_lng IS NULL OR end_lng BETWEEN -180 AND 180)
) ENGINE=InnoDB;


ALTER TABLE clients
    ADD CONSTRAINT fk_clients_created_by
        FOREIGN KEY (created_by) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    ADD CONSTRAINT fk_clients_updated_by
        FOREIGN KEY (updated_by) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE employees
    ADD CONSTRAINT fk_employees_created_by
        FOREIGN KEY (created_by) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    ADD CONSTRAINT fk_employees_updated_by
        FOREIGN KEY (updated_by) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE shifts
    ADD CONSTRAINT fk_shifts_created_by
        FOREIGN KEY (created_by) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    ADD CONSTRAINT fk_shifts_updated_by
        FOREIGN KEY (updated_by) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE placements
    ADD CONSTRAINT fk_placements_created_by
        FOREIGN KEY (created_by) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    ADD CONSTRAINT fk_placements_updated_by
        FOREIGN KEY (updated_by) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE schedules
    ADD CONSTRAINT fk_schedules_created_by
        FOREIGN KEY (created_by) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    ADD CONSTRAINT fk_schedules_updated_by
        FOREIGN KEY (updated_by) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE attendance_requests
    ADD CONSTRAINT fk_requests_created_by
        FOREIGN KEY (created_by) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    ADD CONSTRAINT fk_requests_updated_by
        FOREIGN KEY (updated_by) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE attendances
    ADD CONSTRAINT fk_attendances_created_by
        FOREIGN KEY (created_by) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    ADD CONSTRAINT fk_attendances_updated_by
        FOREIGN KEY (updated_by) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT;



-- CLIENTS
ALTER TABLE clients
    MODIFY created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MODIFY updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP;

-- EMPLOYEES
ALTER TABLE employees
    MODIFY created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MODIFY updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    MODIFY last_login_at TIMESTAMP NULL DEFAULT NULL,
    MODIFY password_hash VARCHAR(255) NOT NULL;

-- SHIFTS
ALTER TABLE shifts
    MODIFY created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MODIFY updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP;

-- PLACEMENTS
ALTER TABLE placements
    MODIFY created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MODIFY updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP;

-- SCHEDULES
ALTER TABLE schedules
    MODIFY created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MODIFY updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP;

-- ATTENDANCE_REQUESTS
ALTER TABLE attendance_requests
    MODIFY created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MODIFY updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    MODIFY reviewed_at TIMESTAMP NULL DEFAULT NULL;

-- ATTENDANCES
ALTER TABLE attendances
    MODIFY created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MODIFY updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE employees
    ADD UNIQUE KEY uq_employees_username (username);