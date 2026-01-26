const pool = require("../../pool");
const position = require('../../interfaces/Positon');

exports.getRestaurant = (email) => {
    const getRestaurantQuery = {
        text: `SELECT
      r.restaurant_id,
      r.restaurant_name,
      r.location,
    
      -- logo
      l.image_id   AS logo_image_id,
      l.link       AS logo_link,
      l.name       AS logo_name,
      l.description AS logo_description,
    
      -- banner
      b.image_id   AS banner_image_id,
      b.link       AS banner_link,
      b.name       AS banner_name,
      b.description AS banner_description
    
    FROM restaurant r
    LEFT JOIN images l ON l.image_id = r.logo_id
    LEFT JOIN images b ON b.image_id = r.banner_id
    WHERE r.owner_id =(
        SELECT user_id FROM users WHERE email = $1 AND is_admin = FALSE);`
        , values: [email]
    };
    return pool.query(getRestaurantQuery);
}

exports.updateRestaurant = (restaurant, id) => {
    const pos = position.castPairToString(restaurant.location)
    const updateRestaurantQuery = {
        text: `UPDATE restaurant SET 
            restaurant_name = $1,
            location = $2
        WHERE restaurant_id = $3`,
        values: [restaurant.restaurant_name, pos, id]
    }
    return pool.query(updateRestaurantQuery);
}

exports.deleteRestaurant = (id) => {
    const deleteRestaurantQuery = {
        text:`DELETE FROM restaurant WHERE restaurant_id = $1`,
        values: [id]
    }
}