const express = require("express");
const bodyParser = require('body-parser');
const { default: axios } = require("axios");
const cors = require('cors')

const app = express();

let post = {}
let services = [
    'http://localhost:4000/events',
    'http://localhost:4001/events',
    'http://localhost:4002/events',
];
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/posts/events', (req, res) => {
    const { type, data } = req.body;
    console.log("Event Bus", req.body);
    axios.post(services[0], { type, data }).catch(err => console.log('err', services[0]))
    axios.post(services[1], { type, data }).catch(err => console.log('err', services[1]))
    axios.post(services[2], { type, data }).catch(err => console.log('err', services[2]))
    res.status(200).send({})
})

app.listen(4005, () => {
    console.log("App listening on port 4005");
})