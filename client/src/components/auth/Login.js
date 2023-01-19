import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };
  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <section className="section-container">
      <div className="form-container box-shadow">
        <p className="form-title">Login to Your Account</p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <input
            type="email"
            className="form-input"
            placeholder="Email"
            required
            name="email"
            onChange={(e) => onChange(e)}
          />

          <input
            type="password"
            placeholder="password"
            required
            minLength="6"
            name="password"
            className="form-input"
            onChange={(e) => onChange(e)}
          />

          <button className="btn btn-form btn-primary">Login</button>
        </form>
        <p className="form-link-title">
          Don't have an acount yet?
          <Link to="/signup" className="form-link">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};
Login.prototype = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
