DROP TABLE IF EXISTS restaurant, restaurant_requests, restaurant_status;

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


CREATE TABLE restaurant_status (
    status_id    SERIAL PRIMARY KEY,
    status_name  VARCHAR(20) NOT NULL UNIQUE -- 'Pending', 'Approved', 'Rejected'
);

INSERT INTO restaurant_status (status_name)
VALUES ('Pending'), ('Approved'), ('Rejected');


-- Note from Fabian: restaurants will only be created after admin approval of registration request
-- Not yet approved requests are stored in restaurant_registration_requests table
-- Once approved, a new restaurant is created here
CREATE TABLE restaurant
(
    restaurant_id       SERIAL PRIMARY KEY,
    restaurant_name     VARCHAR(100) NOT NULL,
    owner_id            INT NOT NULL UNIQUE, --Only one restaurant per owner
    address_id          INT NOT NULL,
    logo_id             INT,
    banner_id           INT,
    FOREIGN KEY (owner_id) REFERENCES users(user_id),
    FOREIGN KEY (Address_id) REFERENCES address(address_id),
    FOREIGN KEY (logo_id) REFERENCES images(image_id),
    FOREIGN KEY (banner_id) REFERENCES images(image_id)
);

INSERT INTO restaurant (restaurant_id, restaurant_name, owner_id, address_id)--Temp data
VALUES
    (1, 'Due Sicilie',1,1),
    (2, 'Lemon Tree',1,1),
    (3, 'Lodenwirt',1,1);

CREATE TABLE opening_times
(
    opening_time_id     SERIAL PRIMARY KEY,
    restaurant_id       INT NOT NULL,
    weekday             SMALLINT, -- 1->Monday,..., 7->Sunday
    open                TIME NOT NULL,
    close               TIME NOT NULL,
    CHECK(weekday BETWEEN 1 AND 7),
    CHECK(open < close),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id)
);

CREATE TABLE categories --Equal for all Restaurants
(
    category_id     SERIAL PRIMARY KEY,
    name            VARCHAR(50) NOT NULL,
    description     text
);

CREATE TABLE items
(
    item_id         SERIAL PRIMARY KEY,
    restaurant_id   INT NOT NULL,
    category_id     INT NOT NULL,
    name            VARCHAR(100) NOT NULL,
    position        INT NOT NULL,
    price           DECIMAL(10,2) NOT NULL,
    image_id        INT,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (image_id) REFERENCES images(image_id)
);

CREATE UNIQUE INDEX dishes_restaurant_position
ON items(restaurant_id,position); --Assert unique positions for a restaurant

CREATE TABLE tags
(
    tag_id  SERIAL PRIMARY KEY,
    name    VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE dish_tags
(
    dish_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (dish_id,tag_id),
    FOREIGN KEY (dish_id) REFERENCES items(item_id),
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
);

CREATE TABLE orders
(
    order_id        SERIAL PRIMARY KEY,
    restaurant_id   INT NOT NULL,
    user_id         INT NOT NULL,
    total           DECIMAL(10,2) NOT NULL,
    discount_id     INT NOT NULL,
    fee_id          INT NOT NULL,
    date            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (discount_id) REFERENCES discounts(discount_id),
    FOREIGN KEY (fee_id) REFERENCES fees(fee_id)
);

CREATE TABLE order_item
(
    order_id    INT NOT NULL,
    item_id     INT NOT NULL,
    quantity    SMALLINT DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id)
);