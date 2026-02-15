const pool = require('../pool');

async function getStatus(userId, period) {
    let interval;

    if (period == 'week') interval = '7 days';
    if (period == 'month') interval = '1 months';
    if (period == 'year') interval = '1 year';

    const query = {
        text: `
            SELECT
                COUNT(*) AS order_count,
                COALESCE(SUM(total), 0) AS total_amount
            FROM orders
            WHERE user_id = $1
            AND date >= NOW() - INTERVAL '${interval}'
        `,
        values: [userId]
    };

    const result = await pool.query(query);

    return {
        orders: Number(result.rows[0].order_count),
        amount: Number(result.rows[0].total_amount)
    }
}

async function calculateLoyaltyDiscount(userId) {
    const rules = await pool.query(
        'SELECT * FROM loyalty_rules ORDER BY discount_value DESC'
    );

    for (const rule of rules.rows) {

        const alreadyUsed = await hasUsedInCurrentPeriod(userId, rule.period);

        if (alreadyUsed) continue;

        const stats = await getStatus(userId, rule.period);

        const meetsOrders =
            rule.min_orders == null || stats.orders >= rule.min_orders;

        const meetsAmount =
            rule.min_amount == null || stats.amount >= rule.min_amount;

        if (meetsOrders && meetsAmount) {
            return {
                source: 'LOYALTY',
                value: rule.discount_value,
                period: rule.period
            };
        }
    }

    return null;
}

async function getFullProgress(userId) {
    const rules = await pool.query(
        'SELECT * FROM loyalty_rules ORDER BY discount_value ASC'
    );

    const levels = [];

    for (const rule of rules.rows) {
        const stats = await getStatus(userId, rule.period);

        const orderProgress = rule.min_orders
            ? stats.orders / rule.min_orders
            : 1;

        const amountProgress = rule.min_amount
            ? stats.amount / rule.min_amount
            : 1;

        const progress = Math.min(orderProgress, amountProgress, 1);

        const unlocked = progress >= 1;
        const used = unlocked
            ? await hasUsedInCurrentPeriod(userId, rule.period)
            : false;

        levels.push({
            period: rule.period,
            discount: rule.discount_value,
            progress: Math.round(progress * 100),
            unlocked: progress >= 1,
            used,
            available: unlocked && !used,
            stats,
            required: {
                orders: rule.min_orders,
                amount: rule.min_amount
            }
        });
    }

    return { levels };
};

async function hasUsedInCurrentPeriod(userId, period) {
    let interval;

    if (period == 'week') interval = '7 days';
    if (period == 'month') interval = '1 months';
    if (period == 'year') interval = '1 year';

    const query = {
        text: `
            SELECT 1
            FROM user_loyalty_usage
            WHERE user_id = $1
            AND period = $2
            AND used_at >= NOW() - INTERVAL '${interval}'
            LIMIT 1
        `,
        values: [userId, period]
    }

    const result = await pool.query(query);

    return result.rowCount > 0;
}


module.exports = {
    calculateLoyaltyDiscount,
    getFullProgress
}