import React, { useEffect, Fragment, Link } from "react";
import PropTypes from "prop-types";
import Experience from "./Experience";
import Education from "./Education";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  const noProfile = (
    <div className="profile">
      <div className="profile-top">
        <div className="profile-top-info">
          <p className="dashboard-welcome title-mini">
            Welcome back, {user && user.name}
          </p>
          <p style={{ padding: "4rem" }}>
            {" "}
            You have not yet setup a profile, please create your profile now
          </p>
        </div>
        <a className="btn btn-light profile-edit-btn" href="/create">
          Create Your portfolio
        </a>
      </div>
    </div>
  );
  const hasProfile = (
    <div className="profile">
      <div className="profile-top" style={{ height: "30rem" }}>
        <div className="profile-top-info">
          <p className="dashboard-welcome title-primary">Dashboard</p>

          <span className="dashboard-welcome title-mini">
            Here you can edit your profile, add your eduaction or experience!
          </span>
        </div>

        <a className="btn btn-light profile-edit-btn" href="/create">
          <span className="setting-icon icon">
            <ion-icon name="settings-outline"></ion-icon>
          </span>
          Edit Your Profile
        </a>
      </div>
      <div className="dashboard-tables">
        <Experience experience={profile?.experience} />
        <Education education={profile?.education} />
        {/* <button className="btn btn-danger" onClick={() => deleteAccount()}>
          <span>
            <ion-icon
              name="person-remove-outline"
              style={{ marginRight: "1rem" }}
            ></ion-icon>
          </span>
          Delete Your Account
        </button> */}
      </div>
    </div>
  );
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <section className="section-container">
      {profile !== null ? hasProfile : noProfile}
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
