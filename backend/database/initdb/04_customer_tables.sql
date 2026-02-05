CREATE TABLE loyalty_rules (
    loyalty_id      SERIAL PRIMARY KEY,
    period          VARCHAR(10) NOT NULL,       -- 'week' | 'month' | 'year'
    min_orders      INT,
    min_amount      DECIMAL(10,2),
    discount_value  DECIMAL(5,2) NOT NULL       -- Prozent
);

INSERT INTO loyalty_rules (period, min_orders, min_amount, discount_value)
VALUES
    ('week', 5, NULL, 5),
    ('month', 10, 150, 10),
    ('year', 50, 1000, 20);
