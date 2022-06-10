const express = require("express");
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const { default: axios } = require("axios");

const app = express();
const comments = {

}
let eventBusUrl = 'http://localhost:4005/posts/events';
app.use(bodyParser.json())
app.use(cors())

app.get('/posts/:id/comments', (req, res) => {
    let { id } = req.params;
    res.status(200).send(comments[id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
    let { id } = req.params;
    let { comment } = req.body;
    if (!comments[id]) {
        comments[id] = []
    }
    let commentId = randomBytes(4).toString('hex');
    let commentObj = { commentId, comment, status: 'pending' };
    comments[id].push(commentObj)
    axios.post(eventBusUrl, { type: "CommentCreated", data: { ...commentObj, postId: id } }).catch(err => console.log(err))
    res.status(200).send(commentObj);
})

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    console.log('Event received', type, data);
    switch (type) {
        case 'CommentModerated':
            const { postId, commentId, comment, status } = data;
            let updatedComment = { postId, commentId, comment, status };
            comments[postId].map(c => {
                if (c.commentId = commentId) {
                    c.status = status
                }
                return c;
            });
            axios.post(eventBusUrl, { type: "CommentUpdated", data: updatedComment }).catch(err => console.log(err))
            break;
        default:
            break;
    }
    res.status(200);
})

app.listen(4001, () => {
    console.log("Comment Service - App listening on port 4001");
})