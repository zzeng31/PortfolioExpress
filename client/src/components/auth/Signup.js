import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import axios from "axios";
import propTypes from "prop-types";
const Signup = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const { name, email, password, passwordRepeat } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordRepeat) {
      setAlert("Password do not match", "danger");
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };
  if (isAuthenticated) {
    return <Navigate to="/dashboard"></Navigate>;
  }

  return (
    <section className="section-container">
      <div className="form-container box-shadow">
        <p className="form-title">Create Your Account</p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <input
            type="text"
            className="form-input"
            placeholder="Name"
            required
            name="name"
            onChange={(e) => onChange(e)}
          />

          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Email"
            required
            onChange={(e) => onChange(e)}
          />

          <input
            type="password"
            placeholder="password"
            name="password"
            required
            minLength="6"
            className="form-input"
            onChange={(e) => onChange(e)}
          />

          <input
            type="password"
            name="passwordRepeat"
            placeholder="Confirm Password"
            required
            minLength="6"
            className="form-input"
            onChange={(e) => onChange(e)}
          />
          <button className="btn btn-form btn-primary">Sign Up</button>
        </form>
        <p className="form-link-title">
          Already have an acount?
          <Link to="/login" className="form-link">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};
Signup.propTypes = {
  setAlert: propTypes.func.isRequired,
  register: propTypes.func.isRequired,
  isAuthenticated: propTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Signup);
