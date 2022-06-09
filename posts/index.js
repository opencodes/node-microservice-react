const express = require("express");
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const { default: axios } = require("axios");
let eventBusUrl = 'http://localhost:4005/posts/events';

const app = express();

let post = {}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
// parse application/json
app.use(bodyParser.json())

app.post('/posts', (req, res) => {
    const { title } = req.body;
    console.log(title);
    let id = randomBytes(4).toString('hex');
    post[id] = {
        title, id
    }
    axios.post(eventBusUrl, { type: "PostCreated", data: post[id] }).catch(err => console.log(err))
    res.status(200).send(post[id])
})
app.get('/posts', (req, res) => {
    res.status(200).send(post)
})
app.post('/events', (req, res) => {
    console.log('Event Received');
    res.status(200).send({})
})
app.listen(4000, () => {
    console.log("App listening on port 4000");
})