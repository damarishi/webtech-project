const position = require('./Positon');

exports.Restaurant = (data) => {
    return {
        restaurant_id: data.restaurant_id,
        restaurant_name: data.restaurant_name,
        location: data.location,

        logo : {
            image_id: data.logo_image_id,
            link: data.logo_link,
            name: data.logo_name,
            description: data.logo_description
        },

        banner : {
            image_id: data.banner_image_id,
            link: data.banner_link,
            name: data.banner_name,
            description: data.banner_description
        }
    };
}