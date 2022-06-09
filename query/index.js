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

app.get('/posts', (req, res) => {
    res.status(200).send(post)
})
app.post('/events', (req, res) => {

    const { type, data } = req.body;
    console.log('Event Received', type);
    switch (type) {
        case 'PostCreated':
            post[data.id] = { ...data, comments: [] }
            break;
        case 'CommentCreated':
            console.log(data);
            const { postId, commentId, comment } = data;
            post[postId].comments.push({ commentId, comment })
            break;
        default:
            break;
    }
    res.status(200);
})
app.listen(4002, () => {
    console.log("App listening on port 4002");
})