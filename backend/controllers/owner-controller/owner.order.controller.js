const pool = require("../../pool");

exports.getOrders = (email) => {
    const getOrdersQuery = {
        text: `SELECT restaurant_id, order_id, user_id, total, status, date FROM orders
        WHERE restaurant_id = (
            SELECT restaurant_id FROM restaurant WHERE  owner_id = (
                SELECT user_id FROM users WHERE email = $1 AND is_deleted = FALSE
        )) AND status >= 0
        ORDER BY order_id`,
        values: [email]
    }
    return pool.query(getOrdersQuery);
}

exports.getOrder = (id) => {
    const getOrderQuery = {
        text: `SELECT restaurant_id, order_id, user_id, total, status, date FROM orders WHERE order_id = $1`,
        values: [id]
    }
    return pool.query(getOrderQuery);
}

exports.createOrder = (order, discount_id, fee) => {
    const createOrderQuery = {
        text: `INSERT INTO orders (restaurant_id, user_id, total, discount_id, status, fee)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING order_id`,
        values: [order.restaurant_id, order.user_id, order.total, discount_id, 0, fee]
    }
    return pool.query(createOrderQuery);
}

exports.updateOrder = (order, id) => {
    const updateOrderQuery = {
        text: `UPDATE orders SET status = $1 WHERE order_id = $2`,
        values: [order.status, id]
    }
    return pool.query(updateOrderQuery);
}

exports.deleteOrder = (id) => {
    const deleteOrderQuery = {
        text: `DELETE FROM orders WHERE order_id = $1`,
        values: [id]
    }
    return pool.query(deleteOrderQuery);
}