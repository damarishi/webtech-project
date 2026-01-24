const express = require("express");
const router = express.Router();
const cast = require("../interfaces/owner_Object_Casting");
const restaurantCtrl = require("../controllers/owner-controller/owner.restaurant.controller")

//api/owner/restaurant

/**
 * Get Full Restaurant
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

module.exports = router;