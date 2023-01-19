import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileGithub from "./ProfileGithub";
import { getProfileById } from "../../actions/profile";
import formatDate from "../../utility/formatDate";
const Profile = ({ getProfileById, profile: { profile }, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  return profile === null ? (
    <Spinner />
  ) : (
    <section className="section-container">
      <div className="profile">
        <div className="profile-top">
          <img
            src={profile.user.avatar}
            alt="dev avatar"
            className="profile-avatar round-icon"
          />
          <div className="profile-top-info">
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth?.user._id === profile?.user._id && (
                <p className="dashboard-welcome title-mini">Welcome back</p>
              )}
            <h1 className="profile-name">{profile.user.name}</h1>
            <p className="profile-job">
              <span className="icon">
                <ion-icon name="briefcase-outline"></ion-icon>
              </span>
              {profile.status} at {profile.company}
            </p>
            <p className="profile-location">
              <span className="icon">
                <ion-icon name="location-outline"></ion-icon>
              </span>
              {profile.location}
            </p>
            <div className="profile-social">
              {profile.website ? (
                <a
                  href={profile.website}
                  className="social-icon icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ion-icon name="globe-outline"></ion-icon>
                </a>
              ) : (
                ""
              )}
              {profile.social?.twitter ? (
                <a
                  href={profile.social.twitter}
                  className="social-icon icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
              ) : (
                ""
              )}
              {profile.social?.instagram ? (
                <a
                  href={profile.social.twitter}
                  className="social-icon icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
              ) : (
                ""
              )}
              {profile.social?.facebook ? (
                <a
                  href={profile.social.facebook}
                  className="social-icon icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
              ) : (
                ""
              )}
              {profile.social?.youtube ? (
                <a
                  href={profile.social.youtube}
                  className="social-icon icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ion-icon name="logo-youtube"></ion-icon>
                </a>
              ) : (
                ""
              )}
            </div>
          </div>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth?.user._id === profile?.user._id && (
              <a className="btn btn-light profile-edit-btn" href="/create">
                <span className="setting-icon icon">
                  <ion-icon name="settings-outline"></ion-icon>
                </span>
                Edit Your portfolio
              </a>
            )}
        </div>

        <div className="profile-about">
          <div className="profile-bio-container box-shadow">
            <p className="profile-bio-title title-tertiary">
              {profile.user.name}'s Bio
            </p>
            <p className="profile-bio">{profile.bio}</p>
          </div>
          <div className="divider"></div>

          <div className="profile-skill-container box-shadow">
            <p className="profile-skill-title title-tertiary">Skills</p>
            <div className="profile-skills">
              {profile.skills.length > 0 && (
                <ul className="profile-skill-list">
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

          <div className="profile-exp-container box-shadow">
            <p className="profile-exp-title title-tertiary">Experience</p>
            {profile.experience.length > 0 ? (
              <Fragment>
                {profile.experience.map((exp, index) => {
                  return (
                    <div className="profile-exp" key={index}>
                      <p className="profile-exp-company title-mini">
                        {exp.company}
                      </p>
                      <p className="profile-exp-work-date">
                        {formatDate(exp.from)} -{" "}
                        {exp.to ? formatDate(exp.to) : "Now"}
                      </p>
                      <p className="profile-exp-position">
                        <strong className="profile-mini-title">
                          Position:
                        </strong>{" "}
                        {exp.title}
                      </p>
                      <p className="profile-exp-description">
                        <strong className="profile-mini-title">
                          Description:
                        </strong>
                        {exp.description}
                      </p>
                    </div>
                  );
                })}
              </Fragment>
            ) : (
              <p>No experience credentials</p>
            )}
          </div>

          <div className="profile-edu-container box-shadow">
            <p className="profile-edu-title title-tertiary">Education</p>
            {profile.education.length > 0 ? (
              <Fragment>
                {profile.education.map((edu, index) => {
                  return (
                    <div className="profile-edu" key={index}>
                      <h3 className="profile-edu-school">{edu.school}</h3>
                      <p className="profile-edu-time">
                        {formatDate(edu.from)} -{" "}
                        {edu.to ? formatDate(edu.to) : "Now"}
                      </p>
                      <p className="profile-edu-degree">
                        <strong className="profile-mini-title">Degree:</strong>
                        {edu.degree}
                      </p>
                      <p className="profile-edu-field">
                        <strong className="profile-mini-title">
                          Field of Study:
                        </strong>
                        {edu.fieldofstudy}
                      </p>
                      <p className="profile-edu-description">
                        <strong className="profile-mini-title">
                          Description:
                        </strong>
                        {edu.description}
                      </p>
                    </div>
                  );
                })}
              </Fragment>
            ) : (
              <p> No Education credentials</p>
            )}
          </div>

          {profile.githubusername ? (
            <div className="profile-github-container">
              <p className="profile-github-title title-tertiary">
                <ion-icon
                  name="logo-github"
                  className="profile-github-icon"
                ></ion-icon>
                Github Repos
              </p>
              <ProfileGithub username={profile.githubusername} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(Profile);
