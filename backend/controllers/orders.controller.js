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
            VALUES ($1, $2, $3, $4, 0, $5)
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
            description: `Order has been created: ` + orderId,
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

exports.getMyOrders = async (req, res) => {
    try {
        const id = req.user.user_id;

        const query = {
            text: `
                SELECT o.order_id, r.restaurant_name, o.total, o.status, o.date
                FROM orders o 
                JOIN restaurant r ON r.restaurant_id = o.restaurant_id
                WHERE o.user_id = $1
                ORDER BY o.date DESC;
            `,
            values: [id]
        };

        const result = await db.query(query);

        if (result.rowCount === 0) {
            return res.status(404).json({message: 'No orders fount' + error.message});
        }
        console.log(id);
        for (let order of result.rows) {
            console.log(order);
        };
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error while fetching orders: ' + error.message);
        res.status(500).json({ error: 'Failed to fetch orders: ' + error.message });
    }
};