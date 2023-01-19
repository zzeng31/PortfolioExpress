import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import formatDate from "../../utility/formatDate";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import Spinner from "../layout/Spinner";
import { getPost, addLike, removeLike, deletePost } from "../../actions/post";

const Post = ({
  getPost,
  auth,
  addLike,
  removeLike,
  post: { post, loading },
}) => {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost, id, post, loading]);
  // if (!auth.loading) {
  //   console.log(post.likes);
  // }

  return loading || post === null ? (
    <Spinner />
  ) : (
    <section className="section-container">
      <div className="posts-container">
        <div className="post-top box-shadow">
          <div className="post-top-author">
            <Link to={`/profile/${post.user}`}>
              <img
                className="post-author-avatar"
                src={post.avatar}
                alt="post-author-avatar"
              />
            </Link>

            <div className="post-top-author-name title-tertiary">
              {post.name}
            </div>
          </div>
          <div className="post-top-content">
            <p className="post-top-text-content">{post.text}</p>
          </div>
          <div className="post-top-btns">
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

              <span className="like-btn" onClick={() => removeLike(post._id)}>
                <span className="icon like-icon">
                  <ion-icon name="thumbs-down-outline"></ion-icon>
                </span>
              </span>
            </div>
          </div>
        </div>
        <p className="title-primary post-title">Comments</p>
        <div className="posts">
          {post.comments.map((comment) => (
            <Comment key={comment._id} comment={comment} postId={post._id} />
          ))}
        </div>
        <CommentForm postId={post._id} />
      </div>
    </section>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPost,
  addLike,
  removeLike,
  deletePost,
})(Post);
