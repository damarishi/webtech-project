DROP TABLE IF EXISTS users, roles, user_roles cascade;

CREATE TABLE users
(
    user_id     SERIAL          PRIMARY KEY,
    email       VARCHAR(255)    NOT NULL UNIQUE,
    username    VARCHAR(100)    NOT NULL,
    full_name   VARCHAR(100),
    password    VARCHAR(255)    NOT NULL, --use bcrypt, 12 salt rounds, Generate Hash with: https://bcrypt-generator.com/
    location    POINT           NOT NULL,
    times_warned INT            DEFAULT 0,
    banned_until TIMESTAMP      DEFAULT NULL,
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



INSERT INTO users (email,username,full_name,password,is_admin, location) VALUES
    ('admin@global.com','admin','Admin I.','$2a$12$pCpivk131i/VzDtaIm13xuxD6JovhcejjVNU92VrL3P8EYDueLw5q',TRUE, '(25,25)'), --pwd: admin
    ('owner@global.com', 'owner','Leonardo','$2a$12$BUJI9rZLtmWwddB0CZ3AfurQaQx6.lqEJ.Zig.PbEo7VhHTmxz15W',FALSE,'(1,1)'),--pwd: owner
    ('bob@example.com','bob42','Bob Schmidt','$2a$12$rpYNMpnZ647YXHmLYemW4OOJkxOHi78KlHs0zDGIUxv.4fvcQaP4q',FALSE, '(1,2)');--pdw: bob123

INSERT INTO user_roles(user_id, role_id) VALUES
    (1,1),(1,2),(1,3),
    (2,2),
    (3,3);
