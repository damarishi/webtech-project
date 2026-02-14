const pool = require("../../pool");

exports.getRestaurantTimes = (email) =>{
    const getRestaurantTimesQuery = {
        text: `SELECT * FROM opening_times
                WHERE restaurant_id = (SELECT restaurant_id FROM restaurant WHERE  owner_id = (
                   SELECT user_id FROM users WHERE email = $1 AND is_deleted = FALSE))
                   ORDER BY weekday, open_time`,
        values: [email]
    }
    return pool.query(getRestaurantTimesQuery);
}

exports.getTime= (opening_time_id) =>{
    const getTimeQuery = {
        text: `SELECT * FROM opening_times
                WHERE opening_time_id = $1`,
        values: [opening_time_id]
    }
    return pool.query(getTimeQuery);
}

exports.createTime = (opening_time, restaurant_id) =>{
    const createTimeQuery = {
        text: `INSERT INTO opening_times (restaurant_id, weekday, open_time, close_time)
                VALUES ($1, $2, $3,$4)`,
        values: [restaurant_id, opening_time.weekday, opening_time.open_time, opening_time.close_time]
    }
    return pool.query(createTimeQuery);
}

exports.updateTime = (opening_time, opening_time_id) =>{
    const updateTimeQuery = {
        text: `UPDATE opening_times SET weekday = $1, open_time = $2, close_time = $3 
                WHERE opening_time_id = $4`,
        values: [opening_time.weekday, opening_time.open_time, opening_time.close_time,opening_time_id]
    }
    return pool.query(updateTimeQuery);
}

exports.deleteTime = (opening_time_id) =>{
    const deleteTimeQuery = {
        text: `DELETE FROM opening_times WHERE opening_time_id = $1`,
        values: [opening_time_id]
    }
    return pool.query(deleteTimeQuery);
}
