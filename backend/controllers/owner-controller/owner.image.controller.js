const pool = require("../../pool");

exports.getImage = (id) => {
    const getImageQuery = {
        text: `SELECT * FROM images WHERE image_id=$1`,
        values: [id]
    }
    return pool.query(getImageQuery);
}

exports.getItemImages = (item_id) => {
    const getItemImagesQuery = {
        text: `SELECT * FROM images i
        JOIN item_images im ON im.image_id = i.image_id
        WHERE im.item_id = $1
        ORDER BY i.image_id`,
        values: [item_id]
    }
    return pool.query(getItemImagesQuery);
}

exports.createImage = (image) => {
    const createImageQuery = {
        text: `INSERT INTO images (link, name, description)
        VALUES ($1, $2, $3)
        RETURNING image_id`,
        values: [image.link, image.name, image.description]
    }
    return pool.query(createImageQuery);
}

exports.assignItemImage = (item_id, image_id) => {
    const assignItemImageQuery = {
        text:`INSERT INTO item_images (item_id, image_id) VALUES ($1, $2)`,
        values: [item_id, image_id]
    }
}

exports.updateImage = (id, image) => {
    const updateImageQuery = {
        text: `UPDATE images 
        SET link = $1, name = $2, description = $3
        WHERE image_id=$4`,
        values: [image.link, image.name, image.description, id]
    }
    return pool.query(updateImageQuery);
}

exports.deleteImage = (id) => {
    const deleteImageQuery = {
        text: `DELETE FROM images WHERE image_id=$1`,
        values: [id]
    }
    return pool.query(deleteImageQuery);
}