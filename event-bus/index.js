const express = require("express");
const bodyParser = require('body-parser');
const { default: axios } = require("axios");
const cors = require('cors')

const app = express();

let events = []
// http://eventbus-srv:4005
let services = [
    'http://posts-clusterip-srv:4000/events',
    // 'http://localhost:4000/events',
    // 'http://localhost:4001/events',
    // 'http://localhost:4002/events',
    // 'http://localhost:4003/events',
];
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/events', (req, res) => {
    res.status(200).send(events)
})
app.post('/posts/events', (req, res) => {
    const { type, data } = req.body;
    console.log("Event Bus", req.body);
    events.push({ type, data })
    axios.post(services[0], { type, data }).catch(err => console.log('err', services[0]))
    // axios.post(services[1], { type, data }).catch(err => console.log('err', services[1]))
    // axios.post(services[2], { type, data }).catch(err => console.log('err', services[2]))
    // axios.post(services[3], { type, data }).catch(err => console.log('err', services[3]))
    res.status(200).send({})
})

app.listen(4005, () => {
    console.log('version 0.0.5');
    console.log("Event Bus Service - App listening on port 4005");
})