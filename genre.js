const joi = require('joi');

const express = require('express');
const app = express();


app.get('/home', (req, res) => {
    res.send("value");
});

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});