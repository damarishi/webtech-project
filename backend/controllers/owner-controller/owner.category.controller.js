const pool = require("../../pool");

exports.getCategories = () => {
    const getCategoriesQuery = {
        text: `SELECT * FROM categories`,
        values: []
    }
    return pool.query(getCategoriesQuery);
}

exports.getCategory = (id) => {
    const getCategoryQuery = {
        text: `SELECT * FROM categories WHERE category_id = $1`,
        values: [id]
    }
    return pool.query(getCategoryQuery);
}

exports.createCategory = (category) => {
    const createCategoryQuery = {
        text:`INSERT INTO categories (name, position, description) VALUES ($1, $2, $3)`,
        values: [category.name, category.position, category.description]
    }
    return pool.query(createCategoryQuery);
}

exports.updateCategory = (id, category) => {
    const updateCategoryQuery = {
        text: `UPDATE categories SET name = $1, position = $2, description = $3
        WHERE category_id = $4`,
        values: [category.name, category.position, category.description, id]
    }
    return pool.query(updateCategoryQuery);
}

exports.deleteCategory = (id) => {
    const deleteCategoryQuery = {
        text: `DELETE FROM categories WHERE category_id = $1`,
        values: [id]
    }
    return pool.query(deleteCategoryQuery);
}