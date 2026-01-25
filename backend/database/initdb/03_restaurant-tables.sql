DROP TABLE IF EXISTS restaurant, restaurant_requests, restaurant_status CASCADE;


CREATE TABLE restaurant_status (
    status_id    SERIAL PRIMARY KEY,
    status_name  VARCHAR(20) NOT NULL UNIQUE -- 'Pending', 'Approved', 'Rejected'
);

INSERT INTO restaurant_status (status_name)
VALUES ('Pending'), ('Approved'), ('Rejected');


CREATE TABLE restaurant_requests (
    request_id      SERIAL PRIMARY KEY,
    restaurant_name VARCHAR(100) NOT NULL,
    requested_by    INT NOT NULL,
    FOREIGN KEY (requested_by) REFERENCES users(user_id), -- TODO: ON DELETE CASCADE?
    requested_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Add additional Information from the restaurant as needed, match with restaurant table
    status_id       INT DEFAULT 1,  -- Default to 'Pending'
    FOREIGN KEY (status_id) REFERENCES restaurant_status(status_id),
    admin_notes    text,     -- Explanation from Admin why approved/rejected
    location            POINT NOT NULL
);

INSERT INTO restaurant_requests (restaurant_name, requested_by, status_id, admin_notes, location)
VALUES
    ('The Pizza Palace', 3, 1, '', '(0,0)');     -- example request, userId 3 is bob42, no admin notes



-- Note from Fabian: restaurants will only be created after admin approval of registration request
-- Not yet approved requests are stored in restaurant_registration_requests table
-- Once approved, a new restaurant is created here
CREATE TABLE restaurant
(
    restaurant_id       SERIAL PRIMARY KEY,
    restaurant_name     VARCHAR(100) NOT NULL,
    owner_id            INT NOT NULL UNIQUE, --Only one restaurant per owner
    location            POINT NOT NULL,
    logo_id             INT,
    banner_id           INT,
    FOREIGN KEY (owner_id) REFERENCES users(user_id),
    FOREIGN KEY (logo_id) REFERENCES images(image_id),
    FOREIGN KEY (banner_id) REFERENCES images(image_id)
);

INSERT INTO restaurant (restaurant_name, owner_id, location)--Temp data
VALUES
    ('Due Sicilie',1, '(10,10)'),
    ('Lemon Tree',2, '(20,10)'), -- Correct Owner ID
    ('Lodenwirt',3,'(20,20)');

CREATE TABLE opening_times
(
    opening_time_id     SERIAL PRIMARY KEY,
    restaurant_id       INT NOT NULL,
    weekday             SMALLINT, -- 1->Monday,..., 7->Sunday
    open_time           TIME NOT NULL,
    close_time          TIME NOT NULL,
    CHECK(weekday BETWEEN 1 AND 7),
    CHECK(open_time < close_time),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id)
);

CREATE TABLE categories --Equal for all Restaurants
(
    category_id     SERIAL PRIMARY KEY,
    name            VARCHAR(50) NOT NULL,
    position        INT NOT NULL UNIQUE,
    description     text
);

CREATE TABLE items
(
    item_id         SERIAL PRIMARY KEY,
    restaurant_id   INT NOT NULL,
    category_id     INT NOT NULL,
    name            VARCHAR(100) NOT NULL,
    description     text,
    position        INT NOT NULL,
    price           DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE UNIQUE INDEX dishes_restaurant_position
ON items(restaurant_id,position); --Assert unique positions for a restaurant

CREATE TABLE item_images
(
    item_id     INT NOT NULL,
    image_id    INT NOT NULL,
    PRIMARY KEY (item_id,image_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id),
    FOREIGN KEY (image_id) REFERENCES images(image_id)
);

CREATE TABLE tags
(
    tag_id  SERIAL PRIMARY KEY,
    name    VARCHAR(50) NOT NULL UNIQUE
);


CREATE TABLE item_tags
(
    item_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (item_id,tag_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id),
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
);

CREATE TABLE orders
(
    order_id        SERIAL PRIMARY KEY,
    restaurant_id   INT NOT NULL,
    user_id         INT NOT NULL,
    total           DECIMAL(10,2) NOT NULL,
    discount_id     INT,
    status          INT NOT NULL,
    fee             INT NOT NULL,
    date            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (discount_id) REFERENCES discounts(discount_id)
);

CREATE TABLE order_item
(
    order_id        INT NOT NULL,
    item_id         INT NOT NULL,
    quantity        SMALLINT DEFAULT 1,
    PRIMARY KEY (order_id,item_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id)
);

CREATE TABLE reviews (
    review_id       SERIAL PRIMARY KEY,
    user_id         INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    restaurant_id   INT NOT NULL REFERENCES restaurant(restaurant_id) ON DELETE CASCADE,
    rating          INT CHECK (rating BETWEEN 1 AND 5),
    comment         TEXT,
    created_at      TIMESTAMP DEFAULT NOW()
)