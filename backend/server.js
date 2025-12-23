const express = require("express");
const cors = require('cors');

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('Test API server running');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});