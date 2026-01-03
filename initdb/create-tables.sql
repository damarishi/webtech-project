DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    user_id     SERIAL          PRIMARY KEY,
    email       VARCHAR(255)    NOT NULL UNIQUE,
    username    VARCHAR(100)    NOT NULL,
    full_name   VARCHAR(100),
    password    VARCHAR(255)    NOT NULL, --use bcrypt, 12 rounds
    is_admin    BOOLEAN         DEFAULT FALSE,
    is_deleted  BOOLEAN         DEFAULT FALSE
);
-- Generate Hash with: https://bcrypt-generator.com/
INSERT INTO users (email,username,full_name,password,is_admin)
VALUES
    ('admin@global.com','admin','Admin I.','$2a$12$pCpivk131i/VzDtaIm13xuxD6JovhcejjVNU92VrL3P8EYDueLw5q',true), --pwd: admin
    ('alice@example.com', 'alice','Alice Müller','$2a$12$2StF9NhsxsDcjR2wUcHpZO1gclDpO3kKtJXLVOy0njUVgnnGFrHpO',FALSE),--pwd: alice123
    ('bob@example.com','bob42','Bob Schmidt','$2a$12$rpYNMpnZ647YXHmLYemW4OOJkxOHi78KlHs0zDGIUxv.4fvcQaP4q',FALSE);--pdw: bob123


CREATE TABLE logs (
                      id SERIAL PRIMARY KEY,
                      description VARCHAR(255) NOT NULL,
                      typeoflog VARCHAR(50) NOT NULL, -- e.g., 'SECURITY', 'USER_MANAGEMENT', 'SYSTEM'
                      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO logs (description, typeoflog)
VALUES
    ('Test Log', 'TestType');