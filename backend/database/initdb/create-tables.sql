DROP TABLE IF EXISTS users, roles, user_roles, logs cascade;

CREATE TABLE users
(
    user_id     SERIAL          PRIMARY KEY,
    email       VARCHAR(255)    NOT NULL UNIQUE,
    username    VARCHAR(100)    NOT NULL,
    full_name   VARCHAR(100),
    password    VARCHAR(255)    NOT NULL, --use bcrypt, 12 salt rounds, Generate Hash with: https://bcrypt-generator.com/
    is_admin    BOOLEAN         DEFAULT FALSE,
    is_deleted  BOOLEAN         DEFAULT FALSE
);

CREATE TABLE roles (
   role_id SERIAL PRIMARY KEY,
   name    VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE
);


INSERT INTO roles (role_id, name) VALUES
    (1, 'ADMIN'),
    (2, 'OWNER'),
    (3, 'USER');



INSERT INTO users (email,username,full_name,password,is_admin) VALUES
    ('admin@global.com','admin','Admin I.','$2a$12$pCpivk131i/VzDtaIm13xuxD6JovhcejjVNU92VrL3P8EYDueLw5q',TRUE), --pwd: admin
    ('alice@example.com', 'alice','Alice Müller','$2a$12$2StF9NhsxsDcjR2wUcHpZO1gclDpO3kKtJXLVOy0njUVgnnGFrHpO',FALSE),--pwd: alice123
    ('bob@example.com','bob42','Bob Schmidt','$2a$12$rpYNMpnZ647YXHmLYemW4OOJkxOHi78KlHs0zDGIUxv.4fvcQaP4q',FALSE);--pdw: bob123

INSERT INTO user_roles(user_id, role_id) VALUES
    (1,1),(1,2),(1,3),
    (2,2),
    (3,3);



-- Tables for Logging
CREATE TABLE log_types (
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

CREATE TABLE restaurant_status (
    status_id    SERIAL PRIMARY KEY,
    status_name  VARCHAR(20) NOT NULL UNIQUE -- 'Pending', 'Approved', 'Rejected'
);

INSERT INTO restaurant_status (status_name) 
VALUES ('Pending'), ('Approved'), ('Rejected');


DROP TABLE IF EXISTS restaurant;

-- Note from Fabian: restaurants will only be created after admin approval of registration request
-- Not yet approved requests are stored in restaurant_registration_requests table
-- Once approved, a new restaurant is created here
CREATE TABLE restaurant
(
    restaurant_id       SERIAL PRIMARY KEY,
    restaurant_name     VARCHAR(100) NOT NULL
    -- Add additional Information from the restaurant as needed, match with registration request
);

INSERT INTO restaurant (restaurant_id, restaurant_name)
VALUES
    (1, 'Due Sicilie'),
    (2, 'Lemon Tree'),
    (3, 'Lodenwirt');


CREATE TABLE restaurant_requests (
    request_id      SERIAL PRIMARY KEY,
    restaurant_name VARCHAR(100) NOT NULL,
    requested_by    INT NOT NULL,
    FOREIGN KEY (requested_by) REFERENCES users(user_id), -- TODO: ON DELETE CASCADE?
    requested_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Add additional Information from the restaurant as needed, match with restaurant table
    status_id       INT DEFAULT 1,  -- Default to 'Pending'
    FOREIGN KEY (status_id) REFERENCES restaurant_status(status_id),
    admin_notes    text     -- Explanation from Admin why approved/rejected
);

INSERT INTO restaurant_requests (restaurant_name, requested_by, status_id, admin_notes)
VALUES 
    ('The Pizza Palace', 3, 1, '');     -- example request, userId 3 is bob42, no admin notes


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