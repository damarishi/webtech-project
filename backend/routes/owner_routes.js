const express = require("express");
const router = express.Router();
const cast = require("../interfaces/owner_Object_Casting");
const restaurantCtrl = require("../controllers/owner-controller/owner.restaurant.controller");
const orderCtrl = require("../controllers/owner-controller/owner.order.controller");
const itemCtrl = require("../controllers/owner-controller/owner.item.controller");
const tagCtrl = require("../controllers/owner-controller/owner.tag.controller");
const catCtrl = require("../controllers/owner-controller/owner.category.controller");
const imageCtrl = require("../controllers/owner-controller/owner.image.controller");

//api/owner/restaurant

/**
 * Get Full Restaurant Data
 */
router.get('',async (req, res) =>{
    const email = req.user.email;

    restaurantCtrl.getRestaurant(email).then(
        result => {
            let data = {};
            if (result.rowCount > 0) {
                data = cast.Restaurant(result.rows[0]);
            }
            console.log("Restaurant Query: ", data);
            res.status(200).json(data);
        }
    ).catch(error => {
        console.error(error)
        res.status(503).json({error: error});
    });
});
//TODO: Add Restaurant on POST, or use general controller

router.put('/:id', async (req, res) => {
    const restaurant = req.body.restaurant;
    const id = req.params.id;
    restaurantCtrl.updateRestaurant(restaurant, id).then( result => {
        console.log(result);
        res.status(200).json({message: "success"});
    }).catch(error => {
        console.error(error);
        res.status(503).json({error: error});
    })
});

//ORDERS
router.get('/orders', async (req, res) => {
    const email = req.user.email;
    try{
        let result = await orderCtrl.getOrders(email);
        let orders = result.rows;
        await Promise.all(
            orders.map(async (order) => {
                order.items = await itemCtrl.getOrderItems(order.order_id).rows;
            })
        );
        console.log("Owner: "+email+"\nOrders "+ orders.length);
        res.status(200).json({orders});
    }catch(error){
        console.error(error);
        res.status(503).json({message: error});
    }
});

router.get('order/:id', async (req, res) => {
    const id = req.params.id;
    try{
        let result = await orderCtrl.getOrder(id);
        let order = result.rows[0];
        order.items = await itemCtrl.getOrderItems(order.order_id).rows;
        res.status(200).json({order});
    }catch(error){
        console.error(error);
        res.status(503).json({message: error});
    }
});

//TODO: Create order on POST, or use general controller (USER)

/**
 * Only thing that can change in order is Status
 */
router.put('order/:id', async (req, res) => {
    const id = req.params.id;
    const order = req.body.order;
    orderCtrl.updateOrder(order, id).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        console.error(error);
        res.status(503).json({message: error});
    })
});

router.delete('order/:id', async (req, res) => {
    const id = req.params.id;
    orderCtrl.deleteOrder(id).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        console.error(error);
        res.status(503).json({message: error});
    })
})

//TAGS
router.get('/tags', async (req, res) => {
    tagCtrl.getTags().then(result => {
        res.status(200).json({tags: result.rows});
    }).catch(error => {
       console.error(error);
       res.status(503).json({message: error});
    });
});

router.get('/tag/:id', async (req, res) => {
    const id = req.params.id;
    tagCtrl.getTag(id).then(result => {
        res.status(200).json({tag: result.rows[0]});
    }).catch(error => {
        console.error(error);
        res.status(503).json({message: error});
    });
});

router.post('/tag', async (req, res) => {
    const tag = req.body.tag;
    tagCtrl.updateTag(tag).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        console.error(error);
        res.status(503).json({message: error});
    });
});

router.put('/tag/:id', async (req, res) => {
    const id = req.params.id;
    const tag = req.body.tag;
    tagCtrl.updateTag(tag, id).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        console.error(error);
        res.status(503).json({message: error});
    });
});

router.delete('/tag/:id', async (req, res) => {
    const id = req.params.id;
    tagCtrl.deleteTag(id).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        console.error(error);
        res.status(503).json({message: error});
    });
});

//CATEGORIES
router.get('/categories', async (req, res) => {
    catCtrl.getCategories().then(result => {
        res.status(200).json({categories: result.rows});
    }).catch(error => {
        console.error(error);
        res.status(503).json({message: error});
    })
})

router.get('/category/:id', async (req, res) => {
    const id = req.params.id;
    catCtrl.getCategory(id).then(result => {
        res.status(200).json({category: result.rows[0]});
    }).catch(error => {
        console.error(error);
        res.status(503).json({message: error});
    })
})

router.post('/category', async (req, res) => {
    const id = req.params.id;
    const category = req.body.category;
    catCtrl.createCategory(category).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        console.error(error);
        res.status(503).json({message: error});
    })
})

router.put('/category/:id', async (req, res) => {
    const id = req.params.id;
    const category = req.body.category;
    catCtrl.updateCategory(id, category).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        console.error(error);
        res.status(503).json({message: error});
    })
})

router.delete('/category/:id', async (req, res) => {
    const id = req.params.id;
    catCtrl.deleteCategory(id).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        console.error(error);
        res.status(503).json({message: error});
    })
})

//ITEMS
router.get('items', async (req, res) => {
    const email = req.user.email;
    try{
        let items = await itemCtrl.getRestaurantItems(email).rows;
        await Promise.all(
            items.map(async (item) => {
            item.category = await catCtrl.getCategory(item.category_id)[0];
            item.tags = await tagCtrl.getItemTags(item.item_id);
            item.images = await imageCtrl.getItemImages(item.image_id);
            })
        );
        return res.status(200).json({items});
    }catch(error){
        console.error(error);
        res.status(500).json({message: error});
    }
});

router.get('/item/:id', async (req, res) => {
    const id = req.params.id;
    try{
        let item = await itemCtrl.getItem(id).rows[0];
        item.category = await catCtrl.getCategory(item.category_id)[0];
        item.tags = await tagCtrl.getItemTags(item.tag_id);
        item.images = await imageCtrl.getItemImages(item.image_id);
    }catch(error){
        console.error(error);
        res.status(503).json({message: error});
    }
})
//TODO: update order_items, item_images, item_tags on necessary routes
//TODO: load item images only if wanted
module.exports = router;