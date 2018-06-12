const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;

// middleware to serve up /public folder
app.use(express.static(publicPath));

app.listen(port, () => console.log(`app listening on port ${port}`));