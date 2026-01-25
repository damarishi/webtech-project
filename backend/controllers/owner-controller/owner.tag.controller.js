const pool = require("../../pool");

exports.getTags = () => {
    const getTagsQuery = {
        text:`SELECT * FROM tags`,
        values:[]
    }
    return pool.query(getTagsQuery);
}

exports.getItemTags = (item_id) => {
    const getItemTagsQuery = {
        text:`SELECT t.* FROM tags t
        JOIN item_tags it ON it.tag_id = t.tag_id
        WHERE it.item_id = $1`,
        values:[item_id]
    }
    return pool.query(getItemTagsQuery);
}

exports.getTag = (id) => {
    const getTagQuery = {
        text:`SELECT * FROM tags WHERE tag_id = $1`,
        values:[id]
    }
    return pool.query(getTagQuery);
}

exports.createTag = (tag) => {
    const createTagQuery = {
        text:`INSERT INTO tags (name) VALUES ($1)`,
        values:[tag.name]
    }
    return pool.query(createTagQuery);
}

exports.assignItemTag = (item_id, tag_id) => {
    const assignTagQuery = {
        text:`INSERT INTO item_tags (item_id, tag_id) VALUES ($1, $2)`,
        values:[item_id, tag_id]
    }
    return pool.query(assignTagQuery);
}

exports.removeItemTag = (item_id, tag_id) => {
    const removeItemTagQuery = {
        text:`DELETE FROM item_tags WHERE item_id = $1 AND tag_id = $2`,
        values:[item_id, tag_id]
    }
    return pool.query(removeItemTagQuery);
}

exports.updateTag = (tag, id) => {
    const updateTagQuery = {
        text:`UPDATE tags SET name = $1 WHERE tag_id = $2`,
        values:[tag.name, id]
    }
    return pool.query(updateTagQuery);
}

exports.deleteTag = (id) => {
    const deleteTagQuery = {
        text:`DELETE FROM tags WHERE tag_id = $1`,
        values:[id]
    }
    return pool.query(deleteTagQuery);
}