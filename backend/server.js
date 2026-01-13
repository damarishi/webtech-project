const express = require("express");
const cors = require('cors');
const logger = require("./src/events/logger");  //add log listener

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth_route");
const restaurantRoutes = require("./routes/restaurant_route");

app.use('/auth', authRoutes);
app.use('/restaurants', restaurantRoutes);

app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('Test API server running');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});