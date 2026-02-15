const express = require("express");
const router = express.Router();
const cast = require("../interfaces/owner_Object_Casting");
const restaurantCtrl = require("../controllers/owner-controller/owner.restaurant.controller");
const orderCtrl = require("../controllers/owner-controller/owner.order.controller");
const itemCtrl = require("../controllers/owner-controller/owner.item.controller");
const tagCtrl = require("../controllers/owner-controller/owner.tag.controller");
const catCtrl = require("../controllers/owner-controller/owner.category.controller");
const imageCtrl = require("../controllers/owner-controller/owner.image.controller");
const timeCtrl = require("../controllers/owner-controller/owner.openingTime.controller");
const pool = require("../pool");

//api/owner/restaurant

function transmitError(error,res){
    console.log(error);
    const code = Number(error.code);
    if (code >= 22000 && code < 24000 || [2000].includes(error.code)) {
        return res.status(422).json({error: error});
    }
    return res.status(503).json({error: error});
}

/**
 * Get Full Restaurant Data
 */
router.get('',async (req, res) =>{
    const email = req.user.email;

    restaurantCtrl.getRestaurant(email).then(
        result => {
            let restaurant = {};
            if (result.rowCount > 0) {
                restaurant = cast.Restaurant(result.rows[0]);
            }
            console.log("Restaurant Query: ", restaurant);
            res.status(200).json(restaurant);
        }
    ).catch(error => {
        transmitError(error, res);
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
        transmitError(error,res);
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
                const result = await itemCtrl.getOrderItems(order.order_id);
                order.items = result.rows;
            })
        );
        console.log("Owner: "+email+"\nOrders "+ orders.length);
        console.log(orders);
        res.status(200).json({orders});
    }catch(error){
        transmitError(error,res);
    }
});

router.get('/order/:id', async (req, res) => {
    const id = req.params.id;
    try{
        let result = await orderCtrl.getOrder(id);
        let order = result.rows[0];
        const items = await itemCtrl.getOrderItems(order.order_id);
        order.items = items.rows;
        res.status(200).json({order});
    }catch(error){
        transmitError(error,res);
    }
});

//TODO: Create order on POST, or use general controller (USER)

/**
 * Only thing that can change in order is Status
 */
router.put('/order/:id', async (req, res) => {
    const id = req.params.id;
    const order = req.body.order;
    orderCtrl.updateOrder(order, id).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        transmitError(error,res);
    })
});

router.delete('/order/:id', async (req, res) => {
    const id = req.params.id;
    orderCtrl.deleteOrder(id).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        transmitError(error,res);
    })
})

//TAGS
router.get('/tags', async (req, res) => {
    tagCtrl.getTags().then(result => {
        res.status(200).json({tags: result.rows});
    }).catch(error => {
        transmitError(error,res);
    });
});

router.get('/tag/:id', async (req, res) => {
    const id = req.params.id;
    tagCtrl.getTag(id).then(result => {
        res.status(200).json({tag: result.rows[0]});
    }).catch(error => {
        transmitError(error,res);
    });
});

router.post('/tag', async (req, res) => {
    const tag = req.body.tag;
    tagCtrl.updateTag(tag).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        transmitError(error,res);
    });
});

router.put('/tag/:id', async (req, res) => {
    const id = req.params.id;
    const tag = req.body.tag;
    tagCtrl.updateTag(tag, id).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        transmitError(error,res);
    });
});

router.delete('/tag/:id', async (req, res) => {
    const id = req.params.id;
    tagCtrl.deleteTag(id).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        transmitError(error,res);
    });
});

//CATEGORIES
router.get('/categories', async (req, res) => {
    catCtrl.getCategories().then(result => {
        res.status(200).json({categories: result.rows});
    }).catch(error => {
        transmitError(error,res);
    })
})

router.get('/category/:id', async (req, res) => {
    const id = req.params.id;
    catCtrl.getCategory(id).then(result => {
        res.status(200).json({category: result.rows[0]});
    }).catch(error => {
        transmitError(error,res);
    })
})

router.post('/category', async (req, res) => {
    const category = req.body.category;
    catCtrl.createCategory(category).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        transmitError(error,res);
    })
})

router.put('/category/:id', async (req, res) => {
    const id = req.params.id;
    const category = req.body.category;
    catCtrl.updateCategory(id, category).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        transmitError(error,res);
    })
})

router.delete('/category/:id', async (req, res) => {
    const id = req.params.id;
    catCtrl.deleteCategory(id).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        transmitError(error,res);
    })
})

//ITEMS
router.get('/items', async (req, res) => {
    const email = req.user.email;
    try{
        let result = await itemCtrl.getRestaurantItems(email);
        let items = result.rows;
        await Promise.all(
            items.map(async (item) => {
                const c_res = await catCtrl.getCategory(item.category_id);
                item.category = c_res.rows[0];

                const t_res = await tagCtrl.getItemTags(item.item_id);
                item.tags = t_res.rows;

                const i_res = await imageCtrl.getItemImages(item.image_id);
                item.images = i_res.rows;
            })
        );
        return res.status(200).json({items});
    }catch(error){
        transmitError(error,res);
    }
});

router.get('/item/:id', async (req, res) => {
    const id = req.params.id;
    try{
        let result = await itemCtrl.getItem(id);
        let item = result.rows[0];
        const c_res = await catCtrl.getCategory(item.category_id);
        item.category = c_res.rows[0];

        const t_res = await tagCtrl.getItemTags(item.item_id);
        item.tags = t_res.rows;

        const i_res = await imageCtrl.getItemImages(item.image_id);
        item.images = i_res.rows;
    }catch(error){
        transmitError(error,res);
    }
})

//TODO: Finish item routes
router.post('/item', async (req, res) => {
    const item = req.body.item;
    const images = item.images;
    const tags = item.tags;
    try{
        await itemCtrl.createItem(item);
        await Promise.all(
            item.tags.map(tag => {
                tagCtrl.assignItemTag(item.item_id, tag.tag_id);
                })
        );
        //Images sent separately
    } catch (error) {
        transmitError(error,res);
    }
})

router.put('/item/:id', async (req, res) => {
    const id = req.params.id;
    const item = req.body.item;

    try{
        await itemCtrl.updateItem(item,id);
        await tagCtrl.removeAllItemTags(id);
        await Promise.all(item.tags.map(tag => tagCtrl.assignItemTag(item.item_id, tag.tag_id)));
        itemCtrl.getItem(id).then(res => console.log(res));
        //TODO: remove old images
        //TODO: set new images
        res.status(200).json({message: "success"});
    }catch(error){
        transmitError(error,res);
    }
})

router.delete('/item/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await tagCtrl.removeAllItemTags(id);
        await itemCtrl.deleteItem(id);
        //TODO: Images
    }catch(error){
        transmitError(error,res);
    }
})
//TODO: update order_items, item_images, item_tags on necessary routes
//TODO: load item images only if wanted


//OPENING-TIMES

router.get('/times', async (req, res) => {
    const email = req.user.email;
    timeCtrl.getRestaurantTimes(email).then(result => {
        const times = result.rows;
        res.status(200).json({times});
    }).catch(error => {
        transmitError(error,res);
    })
})

router.get('/times/:id', async (req, res) => {
    const id = req.params.id;
    timeCtrl.getTime(id).then(result => {
        const time = result.rows[0];
        res.status(200).json({time});
    }).catch(error => {
        transmitError(error,res);
    })
})


router.post('/time', async (req, res) => {
    const time = req.body.time;
    const email = req.user.email;
    restaurantCtrl.getRestaurant(email).then(restaurant_result => {
        const restaurant_id = restaurant_result.rows[0].restaurant_id;
        return timeCtrl.createTime(time, restaurant_id)
    }).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        transmitError(error,res);
    })
})

router.put('/time/:id', async (req, res) => {
    const id = req.params.id;
    const time = req.body.time;
    timeCtrl.updateTime(time,id).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        transmitError(error,res);
    })
})

router.delete('/time/:id', async (req, res) => {
    const id = req.params.id;
    timeCtrl.deleteTime(id).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        transmitError(error,res);
    })
})
module.exports = router;