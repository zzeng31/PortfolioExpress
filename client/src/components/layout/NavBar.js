import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className="navbar-list">
      <li>
        <Link className="navbar-link" to="/dashboard">
          <ion-icon name="library-outline"></ion-icon>
          {"  "}Dashboard
        </Link>
      </li>
      <li>
        <Link className="navbar-link" to="/profiles">
          Developers
        </Link>
      </li>
      <li>
        <Link className="navbar-link" to="/posts">
          Posts
        </Link>
      </li>
      <li>
        <Link className="navbar-link" onClick={logout} to="/">
          <ion-icon name="log-out-outline"></ion-icon> {"  "}Logout
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className="navbar-list">
      <li>
        <Link className="navbar-link" to="/profiles">
          Developers
        </Link>
      </li>
      <li>
        <Link className="navbar-link" to="/signup">
          Signup
        </Link>
      </li>
      <li>
        <Link className="navbar-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar">
      <Link className="logo-container" to="/">
        <img src="/logo.png" className="logo" alt="logo" />
      </Link>

      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}

      <div className="mobile-menu icon">
        <ion-icon name="menu-outline"></ion-icon>
      </div>
    </nav>
  );
};
NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(NavBar);
