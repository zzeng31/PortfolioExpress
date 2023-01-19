import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

import { getProfiles } from "../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="section-container">
            <p className="developer-title title-primary">Developers</p>
            <p className="developer-title title-tertiary">
              <span className="icon">
                {" "}
                <ion-icon name="logo-web-component"></ion-icon>
              </span>

              <span>Browse and connect with developers</span>
            </p>
            {profiles.length !== 0 ? (
              profiles.map((profile, index) => (
                <div className="developers-container" key={index}>
                  <div className="developer box-shadow">
                    <img
                      src={profile.user.avatar}
                      alt="user avatar"
                      className="developer-avatar"
                    />
                    <div className="developer-info">
                      <h2 className="developer-name">{profile.user.name}</h2>
                      <p className="developer-job">
                        <span className="icon">
                          {" "}
                          <ion-icon name="briefcase-outline"></ion-icon>
                        </span>
                        {profile.status}{" "}
                        {profile.company && <span> at {profile.company}</span>}
                      </p>
                      <p className="developer-location">
                        <span className="icon">
                          {" "}
                          <ion-icon name="location-outline"></ion-icon>
                        </span>
                        {profile.location}
                      </p>

                      <Link
                        href="profile.html"
                        className="btn btn-primary developer-btn"
                        to={`/profile/${profile.user._id}`}
                      >
                        View profile
                      </Link>
                    </div>
                    <div className="developer-skill">
                      {profile.skills.length > 0 && (
                        <ul className="developer-skill-list">
                          {profile.skills.map((skill, index) => {
                            return (
                              <li key={index}>
                                <span className="icon">
                                  {" "}
                                  <ion-icon name="checkmark-outline"></ion-icon>
                                </span>
                                {skill}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Spinner />
            )}
          </section>
        </Fragment>
      )}
    </section>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
