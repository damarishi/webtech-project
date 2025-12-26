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