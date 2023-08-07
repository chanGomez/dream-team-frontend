import React, { useContext } from "react";
import { CommentsContext } from "../Context/Context";
import CommentForm from "./CommentForm";
import "./Comments.css"

function Comment() {
    const {
        comment,
        fromParentReviewsHandleSubmit,
        handleDelete,
        viewEditToggleForm,
        setViewEditToggleForm,
      } = useContext(CommentsContext);
    
      function toggleView() {
        setViewEditToggleForm(!viewEditToggleForm);
      }
  return (
    <div className="Comment">
    <button onClick={toggleView}>Edit</button>
    {viewEditToggleForm ? (
      <CommentForm
        fromParentReviewsHandleSubmit={fromParentReviewsHandleSubmit}
        commentDetails={comment}
        toggleView={toggleView}
      />
    ) : (
      <div className="comment">
        <span>{comment.commenter} {comment.content}</span>
        <button onClick={() => handleDelete(comment.id)}>Delete</button>
      </div>
    )}
  </div>
  )
}

export default Comment