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