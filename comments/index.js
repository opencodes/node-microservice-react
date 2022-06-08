const express = require("express");
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
const comments = {

}

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
    let commentObj = { commentId, comment };
    comments[id].push(commentObj)
    res.status(200).send(commentObj);
})

app.listen(4001, () => {
    console.log("Comment app listening on port 4001");
})