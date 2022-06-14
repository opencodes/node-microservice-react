import React from "react";

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let commentText = comment.comment;
    if (comment.status === 'pending') {
      commentText = 'This comment is awaiting moderation'
    }
    if (comment.status === 'rejected') {
      commentText = 'This comment is rejected'
    }
    return <li key={comment.commentId}>
      {commentText}
    </li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
