import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");

  return (
    <form
      className="new-post box-shadow"
      onSubmit={(e) => {
        e.preventDefault();
        addComment(postId, { text });
        setText("");
      }}
    >
      <h3 className="new-post-title">Leave a Comment</h3>
      <textarea
        className="new-post-textarea"
        rows="10"
        cols="50"
        onChange={(e) => setText(e.target.value)}
        value={text}
      >
        {" "}
      </textarea>
      <button className="new-post-submit-btn btn btn-primary">Submit</button>
    </form>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
