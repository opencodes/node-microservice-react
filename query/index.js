const express = require("express");
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const { default: axios } = require("axios");

const app = express();

let post = {}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
// parse application/json
app.use(bodyParser.json())

const handleEvent = (type, data) => {
    switch (type) {
        case 'PostCreated':
            post[data.id] = { ...data, comments: [] }
            break;
        case 'CommentCreated': {
            console.log(data);
            const { postId, commentId, comment, status } = data;
            post[postId].comments.push({ commentId, comment })
        }
            break;
        case 'CommentUpdated': {
            console.log(data);
            const { postId, commentId, comment, status } = data;
            post[postId].comments.map(c => {
                if (c.commentId === commentId) {
                    c.status = status
                }
                return c;
            })
        }
            break;
        default:
            break;
    }
}

app.get('/posts', (req, res) => {
    res.status(200).send(post)
})
app.post('/events', (req, res) => {

    const { type, data } = req.body;
    console.log('Event received', type, data);
    handleEvent(type, data)
    res.status(200);
})
app.listen(4002, async () => {
    console.log("Query Service - App listening on port 4002");
    console.log("Listening on 4002");
    try {
        const res = await axios.get("http://localhost:4005/events");

        for (let event of res.data) {
            console.log("Processing event:", event.type);

            handleEvent(event.type, event.data);
        }
    } catch (error) {
        console.log(error.message);
    }
})