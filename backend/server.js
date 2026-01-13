//1. import modules
const express = require("express");
const cors = require('cors');
const logger = require("./src/events/logger");  //add log listener

const app = express();

//2. setup middleware
app.use(express.static('public'));
app.use(cors());
app.use(express.json());


//3. define routes
const authRoutes = require("./routes/auth_route");

//siteadmin routes
const restaurantRoutes = require("./routes/restaurant.routes");
const userRoutes = require("./routes/user.routes");




//4. route mounting
app.use('/auth', authRoutes);


//site-admin routes mounting
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/users', userRoutes);


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