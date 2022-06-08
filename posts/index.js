const express = require("express");
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')

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
    res.status(200).send(post[id])
})
app.get('/posts', (req, res) => {
    res.status(200).send(post)
})
app.listen(4000, () => {
    console.log("App listening on port 4000");
})