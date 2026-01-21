DROP TABLE IF EXISTS log_types, logs, platform_settings;
-- Tables for Logging
CREATE TABLE log_types
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);
INSERT INTO log_types (name) VALUES
     ('TEST'),   -- for testing purposes
     ('ADMIN'),  -- e.g. admin actions like user bans, role changes
     ('SECURITY'), -- e.g. login attempts, password changes
     ('USER_MANAGEMENT'), -- e.g. user creation, deletion, role changes
     ('SYSTEM'); -- e.g., system errors

CREATE TABLE logs (
      id SERIAL PRIMARY KEY,
      description VARCHAR(255) NOT NULL,
      typeoflog INT DEFAULT 1,  -- Default to 'TEST'
      FOREIGN KEY (typeoflog) REFERENCES log_types(id),
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO logs (description, typeoflog)
VALUES
    ('Test Log', 1);
-- End of Logging Tables

-- Global Platform Settings Table
CREATE TABLE platform_settings (
    id SERIAL PRIMARY KEY,
    setting_name VARCHAR(50) UNIQUE NOT NULL, -- e.g., 'default_service_fee'
    flat_fee DECIMAL(10, 2) DEFAULT 0.00,    -- Flat amount (e.g., $2.00)
    percent_cut DECIMAL(5, 2) DEFAULT 0.00,  -- Percentage (e.g., 10.5 for 10.5%)
    is_active BOOLEAN DEFAULT true,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Platform settings
INSERT INTO platform_settings (setting_name, flat_fee, percent_cut, is_active)
VALUES ('default_service_fee', 1.00, 0.00, true); -- $1.00 flat fee, 0% cut


CREATE TABLE discounts
(
    discount_id    SERIAL PRIMARY KEY,
    code            VARCHAR(10) UNIQUE NOT NULL,
    value           DECIMAL(10,2) NOT NULL,
    active          BOOLEAN DEFAULT TRUE
);

CREATE TABLE images
(
    image_id        SERIAL PRIMARY KEY,
    link            VARCHAR(200),
    name            VARCHAR(100),
    description     text
);