import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "../../store";
const Landing = ({ auth: { isAuthenticated, loading, user } }) => {
  const guestLanding = (
    <div className="landing ">
      <div className="landing-text-box">
        <h1 className="landing-title">
          A Place for Building Your Developer Profile
        </h1>
        <p className="landing-intro">
          Create your own custom portfolio, post your thoughts and connect with
          other developers.
        </p>
      </div>
      <div className="landing-btn-box">
        <Link to="/login" className="btn login-btn btn-light">
          Login
        </Link>
        <Link to="/signup" className="btn join-btn btn-primary">
          Join&rarr;
        </Link>
      </div>
    </div>
  );
  const authLanding = (
    <div className="landing ">
      <div className="landing-text-box">
        <h1 className="landing-title">Welcome Back {user && user.name}</h1>
        <p className="landing-intro">
          Create your own custom portfolio, post your thoughts and connect with
          other developers.
        </p>
      </div>
      <div className="landing-btn-box">
        <Link to="/dashboard" className="btn login-btn btn-primary">
          Dashboard
        </Link>
        <Link to="/profiles" className="btn join-btn btn-primary">
          Developers
        </Link>
      </div>
    </div>
  );
  return (
    <section className="section-container background-img">
      {!loading && (
        <Fragment>{isAuthenticated ? authLanding : guestLanding}</Fragment>
      )}
    </section>
  );
};
Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(Landing);
