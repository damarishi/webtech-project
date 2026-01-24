//1. import modules
const express = require("express");
const cors = require('cors');
const logger = require("./events/logger");  //add log listener

const app = express();

//2. setup middleware
app.use(express.static('public'));
app.use(cors());
app.use(express.json());


//3. define routes
const authRoutes = require("./routes/auth_route");
const restaurantRoutes = require("./routes/restaurant.routes");
const restaurantRequestRoutes = require("./routes/restaurant_requests.routes");
const userRoutes = require("./routes/user.routes.js");
const userModerationRoutes = require("./routes/user_moderation.routes");
const discountRoutes = require("./routes/discount.routes");
const settingsRoutes = require("./routes/platform_settings.routes");

const reviewRoutes = require("./routes/review.routes");

const ownerRoutes = require("./routes/owner_routes");
const isAuth = require("./services/isAuth");


//4. route mounting
app.use('/auth', authRoutes);
app.use('/restaurants',isAuth, restaurantRoutes);
app.use('/api/owner/restaurant',isAuth, ownerRoutes);



//site-admin routes mounting
app.use('/api/restaurants',isAuth, restaurantRoutes);
app.use('/api/users',isAuth, userRoutes);
app.use('/api/restaurant_requests',isAuth, restaurantRequestRoutes);
app.use('/api/user_moderation',isAuth, userModerationRoutes);
app.use('/api/discounts',isAuth, discountRoutes);
app.use('/api/platform_settings',isAuth, settingsRoutes)

app.use('/api/reviews', reviewRoutes);



//default route
app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('Test API server running');
});




//5. start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});