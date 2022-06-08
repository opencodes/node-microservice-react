const express = require("express");
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')

const app = express();

let post = {}

app.use(express.bodyParser())
app.post('/post', (req, res) => {
    const { title } = req.body;
    console.log(title);
    let id = randomBytes(4);
    post[id] = {
        title, id
    }
    res.status(200).send(post[id])
})
app.get('/post', (req, res) => {
    res.status(200).send(post)
})
app.listen(4001, () => {
    console.log("App listening on port 4001");
})