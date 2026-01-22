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

//4. route mounting
app.use('/auth', authRoutes);
app.use('/restaurants', restaurantRoutes);



//site-admin routes mounting
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/users', userRoutes);
app.use('/api/restaurant_requests', restaurantRequestRoutes);
app.use('/api/user_moderation', userModerationRoutes);
app.use('/api/discounts', discountRoutes);



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