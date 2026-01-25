const express = require("express");
const router = express.Router();
const cast = require("../interfaces/owner_Object_Casting");
const restaurantCtrl = require("../controllers/owner-controller/owner.restaurant.controller");
const orderCtrl = require("../controllers/owner-controller/owner.order.controller");
const itemCtrl = require("../controllers/owner-controller/owner.item.controller");

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
        console.log(error)
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
        console.log(error);
        res.status(503).json({error: error});
    })
});

//Not loading tags here
router.get('/orders', async (req, res) => {
    const email = req.user.email;
    try{
        let result = await orderCtrl.getOrders(email);
        let orders = result.rows;
        await Promise.all(
            orders.map(async (order) => {
                order.items = await itemCtrl.getOrderItems(order.order_id);
            })
        );
        console.log("Owner: "+email+"\nOrders "+ orders.length);
        res.status(200).json({orders});
    }catch(error){
        console.log(error);
        res.status(503).json({message: error});
    }
});

router.get('order/:id', async (req, res) => {
    const id = req.params.id;
    try{
        let result = await orderCtrl.getOrder(id);
        let order = result.rows[0];
        await itemCtrl.getOrderItems(order.order_id);
        res.status(200).json({order});
    }catch(error){
        console.log(error);
        res.status(503).json({message: error});
    }
});

//TODO: Create order on POST, or use general controller

/**
 * Only thing that can change in order is Status
 */
router.put('order/:id', async (req, res) => {
    const id = req.params.id;
    const order = req.body.order;
    orderCtrl.updateOrder(order, id).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        console.log(error);
        res.status(503).json({message: error});
    })
});

router.delete('order/:id', async (req, res) => {
    const id = req.params.id;
    orderCtrl.deleteOrder(id).then(result => {
        res.status(200).json({message: "success"});
    }).catch(error => {
        console.log(error);
        res.status(503).json({message: error});
    })
})

//TODO: TAG endpoints


//TODO: update order_items, item_images, item_tags on necessary routes
//TODO: load item images only if wanted
module.exports = router;