import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import formatDate from "../../utility/formatDate";
import { deleteComment } from "../../actions/post";

const Comment = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => {
  return (
    <div className="post-card box-shadow" key={postId}>
      <div className="post-author">
        <Link to={`/profile/${user}`}>
          <img
            className="post-card-author-avatar"
            src={avatar}
            alt="post-author-avatar"
          />
        </Link>

        <div className="post-card-author-name">{name}</div>
        {!auth.loading && user === auth.user._id && (
          <span
            className="post-card-delete btn-small"
            onClick={() => deleteComment(postId, _id)}
          >
            <ion-icon name="trash-outline"></ion-icon>
          </span>
        )}
      </div>
      <div className="post-card-content">
        <p className="post-card-text-content">{text}</p>
        <p className="post-card-date">Posted on {formatDate(date)}</p>
      </div>
    </div>
  );
};

Comment.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(Comment);
