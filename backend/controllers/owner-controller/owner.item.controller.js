const pool = require("../../pool");

exports.getRestaurantItems = (email) => {
    const getItemsQuery = {
        text: `SELECT item_id,restaurant_id, name, description, position, price, category_id FROM items
        WHERE restaurant_id = (
            SELECT restaurant_id FROM restaurant WHERE  owner_id = (
               SELECT user_id FROM users WHERE email = $1 AND is_deleted = FALSE
        ))
        ORDER BY position`,
        values: [email],
    }
    return pool.query(getItemsQuery);
}

exports.getOrderItems = (order_id) =>{
    const getItemsQuery = {
        text: `SELECT i.item_id, i.name, i.price, oi.quantity FROM items i
        JOIN order_item oi ON oi.item_id = i.item_id
        WHERE oi.order_id = $1
        ORDER BY position`,
        values: [order_id],
    }
    return pool.query(getItemsQuery);
}

exports.getItem = (id) =>{
    const getItemQuery = {
        text: `SELECT item_id,restaurant_id, name, description, position, price, category_id FROM items
        WHERE item_id = $1`,
        values: [id]
    }
    return pool.query(getItemQuery);
}

exports.createItem = (item) =>{
    const createItemQuery = {
        text:`INSERT INTO items (name, restaurant_id, category_id, description, position, price) VALUES 
        ($1,$2,$3,$4,$5,$6) RETURNING item_id`,
        values: [item.name, item.restaurant_id, item.category_id, item.description, item.position, item.price],
    }
    return pool.query(createItemQuery);
}

exports.updateItem = (item, id) =>{
    const updateItemQuery = {
        text: `UPDATE items SET name = $1, description = $2, position = $3, price = $4 WHERE item_id = $5`,
        values: [item.name, item.description, item.position, item.price, id],
    }
    return pool.query(updateItemQuery);
}

exports.deleteItem = (id) =>{
    const deleteItemQuery = {
        text: `DELETE FROM items WHERE item_id = $1`,
        values: [id]
    }
    return pool.query(deleteItemQuery);
}