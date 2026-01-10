DROP TABLE IF EXISTS users, roles, user_roles, logs cascade;

CREATE TABLE users
(
    user_id     SERIAL          PRIMARY KEY,
    email       VARCHAR(255)    NOT NULL UNIQUE,
    username    VARCHAR(100)    NOT NULL,
    full_name   VARCHAR(100),
    password    VARCHAR(255)    NOT NULL, --use bcrypt, 12 rounds, Generate Hash with: https://bcrypt-generator.com/
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


INSERT INTO roles (name) VALUES
    ('ADMIN'),  -- 1
    ('OWNER'),  -- 2
    ('USER');   -- 3



INSERT INTO users (email,username,full_name,password,is_admin) VALUES
    ('admin@global.com','admin','Admin I.','$2a$12$pCpivk131i/VzDtaIm13xuxD6JovhcejjVNU92VrL3P8EYDueLw5q',TRUE), --pwd: admin
    ('alice@example.com', 'alice','Alice Müller','$2a$12$2StF9NhsxsDcjR2wUcHpZO1gclDpO3kKtJXLVOy0njUVgnnGFrHpO',FALSE),--pwd: alice123
    ('bob@example.com','bob42','Bob Schmidt','$2a$12$rpYNMpnZ647YXHmLYemW4OOJkxOHi78KlHs0zDGIUxv.4fvcQaP4q',FALSE);--pdw: bob123

INSERT INTO user_roles(user_id, role_id) VALUES
    (1,1),(1,2),(1,3),
    (2,2),
    (3,3);

CREATE TABLE logs (
      id SERIAL PRIMARY KEY,
      description VARCHAR(255) NOT NULL,
      typeoflog VARCHAR(50) NOT NULL, -- e.g., 'SECURITY', 'USER_MANAGEMENT', 'SYSTEM'
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO logs (description, typeoflog)
VALUES
    ('Test Log', 'TestType');