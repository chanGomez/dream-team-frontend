import React, { useContext } from "react";
import { CommentsContext } from "../Context/Context";
import CommentForm from "./CommentForm";
import "./Comments.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

function Comment() {
  const {
    comment,
    fromParentCommentsHandleSubmit,
    handleDelete,
    viewEditToggleForm,
    setViewEditToggleForm,
  } = useContext(CommentsContext);

  function toggleView() {
    setViewEditToggleForm(!viewEditToggleForm);
  }
  return (
    
    <div className="Comment">
      <div className="Comment-inner">
     
      {viewEditToggleForm ? (
        <CommentForm
        fromParentCommentsHandleSubmit={fromParentCommentsHandleSubmit}
          commentDetails={comment}
          toggleView={toggleView}
        />
      ) : (
        <div className="comment">
          <span>{comment.commenter}</span>
          <span>{comment.content}</span>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(comment.id)}
          >
            Delete
          </button>
        </div>
      )}
       <FontAwesomeIcon icon={faPenToSquare} onClick={toggleView} className="edit-button"/>

      </div>
    </div>
  );
}

export default Comment;
