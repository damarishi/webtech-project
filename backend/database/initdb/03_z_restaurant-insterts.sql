INSERT INTO categories (name, description, position) VALUES
    ('Starters', 'Small dishes served before the main course', 1),
    ('Main Courses', 'Hearty main dishes', 2),
    ('Desserts', 'Sweet dishes served after meals', 3),
    ('Drinks', 'Alcoholic and non-alcoholic beverages', 4);

-------------------------------Items-------------------------------------

-- Starters
INSERT INTO items (restaurant_id, category_id, name, position, price, description) VALUES
    (2, 1, 'Bruschetta', 1, 5.50, 'Grilled bread topped with fresh tomatoes, garlic, and basil'),
    (2, 1, 'Garlic Bread', 2, 4.00, 'Toasted bread with garlic butter and herbs'),
    (2, 1, 'Caprese Salad', 3, 6.50, 'Fresh mozzarella, tomatoes, and basil drizzled with olive oil');

-- Main Courses
INSERT INTO items (restaurant_id, category_id, name, position, price, description) VALUES
    (2, 2, 'Margherita Pizza', 4, 10.00, 'Classic pizza with tomato sauce, mozzarella, and basil'),
    (2, 2, 'Pepperoni Pizza', 5, 12.00, 'Pizza topped with pepperoni slices and cheese'),
    (2, 2, 'Lasagna', 6, 13.50, 'Layered pasta with meat sauce, ricotta, and mozzarella'),
    (2, 2, 'Tacos', 7, 11.00, 'Soft tortillas filled with seasoned meat and vegetables'),
    (2, 2, 'Schnitzel', 8, 14.00, 'Breaded and fried meat served with lemon and side dishes'),
    (2, 2, 'Pad Thai', 9, 12.50, 'Stir-fried rice noodles with shrimp, tofu, peanuts, and tamarind sauce');

-- Desserts
INSERT INTO items (restaurant_id, category_id, name, position, price, description) VALUES
    (2, 3, 'Tiramisu', 10, 6.50, 'Coffee-flavored Italian dessert with mascarpone cheese'),
    (2, 3, 'Chocolate Cake', 11, 5.50, 'Rich and moist chocolate layered cake'),
    (2, 3, 'Ice Cream Sundae', 12, 4.50, 'Vanilla ice cream topped with chocolate sauce and nuts');

-- Drinks
INSERT INTO items (restaurant_id, category_id, name, position, price, description) VALUES
    (2, 4, 'Coca-Cola', 13, 2.50, 'Classic carbonated soft drink'),
    (2, 4, 'Orange Juice', 14, 3.00, 'Freshly squeezed orange juice'),
    (2, 4, 'Beer', 15, 4.50, 'Cold lager served in a glass'),
    (2, 4, 'Red Wine', 16, 6.00, 'Full-bodied red wine, served at room temperature');


-------------------------------Tags-------------------------------------
INSERT INTO tags (name) VALUES
    ('Alcoholic'),
    ('Non-Alcoholic'),
    ('Pizza'),
    ('Cold'),
    ('Hot'),
    ('Italian'),
    ('Mexican'),
    ('Austrian'),
    ('Asian'),
    ('Vegetarian'),
    ('Vegan'),
    ('Recommended'),
    ('New');

-------------------------------Tag-Binding-------------------------------------
-- Starters
INSERT INTO item_tags (item_id, tag_id) VALUES
    (1, 12), -- Bruschetta → Recommendation
    (1, 10), -- Vegetarian
    (2, 10), -- Garlic Bread → Vegetarian
    (3, 10), -- Caprese Salad → Vegetarian
    (3, 12);  -- Recommendation

-- Main Courses
INSERT INTO item_tags (item_id, tag_id) VALUES
    (4, 3), -- Margherita Pizza → Pizza
    (4, 6), -- Italian
    (4, 10), -- Vegetarian
    (4, 12), -- Recommendation
    (5, 3), -- Pepperoni Pizza → Pizza
    (5, 6), -- Italian
    (6, 6), -- Lasagna → Italian
    (6, 10), -- Vegetarian
    (7, 7), -- Tacos → Recommendation
    (7, 12), -- Mexican
    (8, 8), -- Schnitzel → Austrian
    (9, 9); -- Pad Thai → Asian

-- Desserts
INSERT INTO item_tags (item_id, tag_id) VALUES
    (10, 12), -- Tiramisu → Recommendation
    (10, 6), -- Italian
    (11, 12), -- Chocolate Cake → Recommendation
    (12, 12); -- Ice Cream Sundae → Recommendation

-- Drinks
INSERT INTO item_tags (item_id, tag_id) VALUES
    (13, 2), -- Coca-Cola → Non-Alcoholic
    (13, 4), -- Cold
    (14, 2), -- Orange Juice → Non-Alcoholic
    (14, 4), -- Cold
    (15, 1), -- Beer → Alcoholic
    (15, 4), -- Cold
    (16, 1); -- Red Wine → Alcoholic


-- Sample Orders
INSERT INTO orders (restaurant_id, user_id, total, discount_id, status, fee, date)
VALUES
    (2, 1, 25.50, NULL, -1, 1, '2026-02-14 12:30:00'),
    (2, 2, 18.75, NULL, -1, 1, '2026-02-14 13:15:00'),
    (2, 3, 40.00, NULL, -1, 1, '2026-02-15 18:45:00'),
    (2, 1, 25.50, NULL, -1, 1, '2026-02-14 12:30:00'),
    (2, 2, 18.75, NULL, -1, 1, '2026-02-14 13:15:00'),
    (2, 3, 40.00, NULL, -1, 1, '2026-02-15 18:45:00'),
    (2, 2, 30.00, NULL, -1, 1, '2026-02-15 20:10:00'),
    (2, 2, 22.50, NULL, -1, 1, '2026-02-16 11:00:00'),
    (2, 1, 35.00, NULL, -1, 1, '2026-02-16 14:25:00');


-- Sample Order Items
INSERT INTO order_item (order_id, item_id, quantity)
VALUES
    (1, 1, 2),
    (1, 2, 1),
    (2, 3, 1),
    (2, 4, 2),
    (3, 1, 3),
    (3, 5, 1),
    (4, 2, 2),
    (4, 6, 1),
    (5, 3, 1),
    (5, 7, 2),
    (6, 1, 2),
    (6, 4, 1),
    (7, 2, 3),
    (7, 5, 1),
    (8, 1, 1),
    (8, 6, 2),
    (9, 3, 2),
    (9, 7, 1);