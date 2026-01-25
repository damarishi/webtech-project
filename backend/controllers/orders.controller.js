const db = require('../pool');
const logger = require('../events/logger.js');

exports.getAll = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM orders');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
};

exports.createOrder = async (req, res) => {
    const client = await db.connect();

    try {
        const userId = req.user.user_id;
        const { restaurantId, items, total, discountId, fee } = req.body;

        await client.query('BEGIN');

        //order anlegen
        const orderQuery = `
            INSERT INTO orders (restaurant_id, user_id, total, discount_id, status, fee)
            VALUES ($1, $2, $3, $4, 1, $5)
            RETURNING order_id
        `;

        const orderResult = await client.query(orderQuery, [
            restaurantId,
            userId,
            total,
            discountId ?? null,
            fee
        ]);

        const orderId = orderResult.rows[0].order_id;

        //order items
        const itemQuery = `
            INSERT INTO order_item (order_id, item_id, quantity)
            VALUES ($1, $2, $3)
        `;

        for (const item of items) {
            await client.query(itemQuery, [
                orderId,
                item.item_id,
                item.quantity
            ]);
        }

        await client.query('COMMIT');

        //Owner benachrichtigen ??

        logger.emit('log', { 
            description: `Order has been created: ` + code, 
            typeOfLog: 2 
        });

        res.status(201).json({order_id: orderId, status: 1});
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error while creating order: ' + error);
        res.status(500).json({ error: 'Failed to create order' + error.message});
    } finally {
        client.release();
    }
}