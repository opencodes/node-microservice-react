const express = require('express')
const bodyParser = require('body-parser')
const { default: axios } = require("axios");


const app = express();
app.use(bodyParser.json())


// let eventBusUrl = 'http://localhost:4005/posts/events';
let eventBusUrl = 'http://eventbus-clusterip-srv:4005/posts/events';

const statusList = ['approved', 'rejected'];

const getStatus = (second) => {
    return statusList[Math.floor(Math.random() * 2)]
}

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    console.log('Event received', type, data);
    let moderatedComment = data;
    switch (type) {
        case 'CommentCreated':
            const { postId, commentId, comment, status } = data;
            moderatedComment.status = getStatus();
            axios.post(eventBusUrl, { type: "CommentModerated", data: moderatedComment }).catch(err => console.log(err))
            break;
        default:
            break;
    }
    res.status(200);
})

app.listen(4003, () => {
    console.log("Moderate Service - App listening on port 4003");
})