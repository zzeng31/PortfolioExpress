import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import formatDate from "../../utility/formatDate";

import Spinner from "../layout/Spinner";
import {
  getPosts,
  addLike,
  removeLike,
  deletePost,
  addPost,
} from "../../actions/post";
const Posts = ({
  addLike,
  removeLike,
  getPosts,
  addPost,
  deletePost,
  auth,
  post: { posts, loading },
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  const [text, setText] = useState("");

  return loading ? (
    <Spinner />
  ) : (
    <section className="section-container">
      <div className="posts-container">
        <p className="post-title title-primary">Welcome to the community</p>
        <div className="posts">
          {posts.length > 0 ? (
            posts.map((post, index) => {
              return (
                <div className="post-card box-shadow" key={post._id}>
                  <div className="post-author">
                    <Link to={`/profile/${post.user}`}>
                      <img
                        className="post-card-author-avatar"
                        src={post.avatar}
                        alt="post-author-avatar"
                      />
                    </Link>

                    <div className="post-card-author-name">{post.name}</div>
                    {!auth.loading && post.user === auth.user._id && (
                      <span
                        className="post-card-delete btn-small"
                        onClick={() => deletePost(post._id)}
                      >
                        <ion-icon name="trash-outline"></ion-icon>
                      </span>
                    )}
                  </div>
                  <div className="post-card-content">
                    <p className="post-card-text-content">{post.text}</p>
                    <p className="post-card-date">
                      Posted on {formatDate(post.date)}
                    </p>
                  </div>
                  <div className="post-card-btns">
                    <div className="post-card-like-btns">
                      <span
                        className={`like-btn ${
                          !auth.loading &&
                          post.likes.some((like) => like.user === auth.user._id)
                            ? `btn btn-primary`
                            : ``
                        }`}
                        onClick={() => addLike(post._id)}
                      >
                        <span>
                          <ion-icon name="thumbs-up-outline"></ion-icon>
                        </span>

                        <span className="like-number">{post.likes.length}</span>
                      </span>

                      <span
                        className="like-btn"
                        onClick={() => removeLike(post._id)}
                      >
                        <span className="icon like-icon">
                          <ion-icon name="thumbs-down-outline"></ion-icon>
                        </span>
                      </span>
                    </div>

                    <Link
                      to={`/posts/${post._id}`}
                      className="post-card-comment btn-small"
                    >
                      <ion-icon name="chatbubbles-outline"></ion-icon>
                      <span className="post-card-comment-num">
                        {post.comments.length}
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <Spinner />
          )}
        </div>
        <form
          className="new-post box-shadow"
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ text });
            setText("");
          }}
        >
          <h3 className="new-post-title">Say something</h3>
          <textarea
            className="new-post-textarea"
            rows="10"
            cols="50"
            onChange={(e) => setText(e.target.value)}
            value={text}
          >
            {" "}
          </textarea>
          <button className="new-post-submit-btn btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getPosts,
  addLike,
  removeLike,
  addPost,
  deletePost,
})(Posts);
