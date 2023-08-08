import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import "./Comments.css"

import CommentForm from "./CommentForm";

import {
  getTeamCommentAPI,
  createTeamCommentAPI,
  updateTeamCommentAPI,
  deleteTeamCommentAPI
} from "../Api/API";

import { CommentsContext } from "../Context/Context"

const API = process.env.REACT_APP_API_URL;


function Comments() {
const [comments, setComments] = useState([]);

const [viewEditToggleForm, setViewEditToggleForm] = useState(false);

let { id } = useParams();

useEffect(() => {
  fetchTeamComment();
}, [id, API]);

async function fetchTeamComment() {
  try {
    let result = await getTeamCommentAPI(id);

    setComments(result.data);
  } catch (error) {
    console.log(error);
  }
}

async function handleAdd(newComment) {
  try {
    let result = await createTeamCommentAPI(id, newComment);
    setComments([result.data, ...comments]);
  } catch (error) {
    console.log(error);
  }
}

async function handleEdit(updatedComment) {
  console.log("Handle Edit", updatedComment);
  try {
    let result = await updateTeamCommentAPI(
      id,
      updatedComment.id,
      updatedComment
    );

    const copyCommentArray = [...comments];

    const indexUpdatedComment = copyCommentArray.findIndex((comment) => {
      return comment.id === updatedComment.id;
    });

    copyCommentArray[indexUpdatedComment] = result.data;

    setComments(copyCommentArray);

    setViewEditToggleForm(!viewEditToggleForm);
  } catch (error) {
    alert("sorry, we cannot update, please contact support");
    console.log(error);
  }
}

async function handleDelete(id) {
  try {
    await deleteTeamCommentAPI(id);

    let filteredCommentArray = comments.filter((item) => item.id !== id);

    setComments(filteredCommentArray);
  } catch (error) {
    console.log(error);
  }
}

return(
  <section className="container">
    <div className=" comments-container">
    <h5 className="comment-heading">Add a New Comment</h5>
    <CommentForm fromParentCommentsHandleSubmit={handleAdd}>
      </CommentForm>
    <h5 className="comment-heading-comment">Comments</h5>
  {comments.map((item) => {
    return (
      <CommentsContext.Provider
        value={{
          fromParentCommentsHandleSubmit: handleEdit,
          comment: item,
          handleDelete: handleDelete,
          viewEditToggleForm: viewEditToggleForm,
          setViewEditToggleForm: setViewEditToggleForm,
        }}
        key={item.id}
      >
        <Comment />
      </CommentsContext.Provider>
    );
  })}

    </div>
</section>
)
}

export default Comments;
