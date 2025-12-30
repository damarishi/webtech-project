DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    user_id     SERIAL PRIMARY KEY,
    user_name   VARCHAR(100) NOT NULL
);

INSERT INTO users (user_name)
VALUES
    ('Tom'),
    ('Daniel'),
    ('Lisa');

CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    typeoflog VARCHAR(50) NOT NULL, -- e.g., 'SECURITY', 'USER_MANAGEMENT', 'SYSTEM'
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO logs (description, typeoflog)
VALUES
    ('Test Log', 'TestType');