import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Comments.css";

function CommentForm(props) {
  let { id } = useParams();

  const { commentDetails } = props;
  
  const [comment, setComment] = useState({
    commenter: "",
    content: "",
    team_id: id,
  });

  useEffect(() => {
    if (commentDetails) {
      setComment(commentDetails);
    }
  }, [id, commentDetails, props]);

  function handleTextChange(event) {
    setComment({ ...comment, [event.target.id]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.fromParentCommentsHandleSubmit(comment);

    setComment({
      commenter: "",
      content: "",
      team_id: id,
    });
  }
  return (
    <div className="container">
      {props.children}
      <form onSubmit={handleSubmit}>
        <label htmlFor="commenter" className="form-label">
          {" "}
          Name:
        </label>
        <div className="mb-3">
          <input
            className="form-control"
            required
            type="text"
            id="commenter"
            placeholder="Your name"
            value={comment.commenter}
            onChange={handleTextChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            {" "}
            Review:
          </label>
          <textarea
            className="form-control"
            required
            type="text"
            id="content"
            placeholder="What do you think...."
            name="content"
            value={comment.content}
            onChange={handleTextChange}
          />
        </div>

        <br />
        <input type="submit" className="btn btn-primary" />
      </form>
    </div>
  );
}

export default CommentForm;
