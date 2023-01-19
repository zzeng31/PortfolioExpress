import React, { useState, Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createProfile,
  getCurrentProfile,
  addExperience,
  addEducation,
} from "../../actions/profile";
const initialState = {
  company: "",
  website: "",
  location: "",
  status: "",
  skills: "",
  githubusername: "",
  bio: "",
  experience: [],
  education: [],
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: "",
};

const CreateProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    experience,
    education,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const [displaySocial, setDisplaySocial] = useState(false);

  const [skillTags, setSkillTags] = useState([]);
  const [displayExp, setDisplayExp] = useState(false);
  const [displayEdu, setDisplayEdu] = useState(false);
  const [displaySkillInput, setDisplaySkillInput] = useState(false);

  useEffect(() => {
    // if there is no profile, attempt to fetch one
    if (!profile) getCurrentProfile();

    // if we finished loading and we do have a profile
    // then build our profileData
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      // the skills may be an array from our API response
      if (Array.isArray(profileData.skills)) {
        setSkillTags(profileData.skills);
        profileData.skills = profileData.skills.join(", ");
      }

      // set local state with the profileData
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);
  const onChange = (e) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let skillTag = "";
  const addSkill = () => {
    if (skillTag.length === 0) return;
    setSkillTags([...skillTags, skillTag]);
    setDisplaySkillInput(false);
    setFormData({ ...formData, skills: [...skillTags, skillTag].join(",") });
  };
  const onSkillChange = (e) => {
    skillTag = e.target.value;
  };
  const submitForm = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, profile ? true : false);
  };
  return (
    <Fragment>
      <form className="edit-form" onSubmit={(e) => submitForm(e)}>
        <p className="edit-form-title title-primary">Edit Your Portfolio</p>
        <Link className="edit-add-btn btn btn-light" to="/experience">
          <span class="icon">
            {" "}
            <ion-icon name="briefcase-outline"></ion-icon>
          </span>
          Add Experience
        </Link>
        <Link className="edit-add-btn btn btn-light" to="/education">
          <span class="icon">
            {" "}
            <ion-icon name="school-outline"></ion-icon>
          </span>
          Add Education
        </Link>
        <div className="edit-form-container box-shadow">
          <p className="edit-form-title">Profile</p>
          <span className="required-text">*required</span>

          <label className="edit-input-label">
            Give us an idea of where you are in your career
          </label>
          <input
            type="text"
            className="edit-form-input input"
            placeholder="Professional Status"
            name="status"
            value={status}
            required
            onChange={(e) => onChange(e)}
          />
          <label className="edit-input-label">
            Could be your company or where you work for
          </label>
          <input
            type="text"
            className="edit-form-input input"
            placeholder="Company"
            name="company"
            required
            value={company}
            onChange={(e) => onChange(e)}
          />
          <label className="edit-input-label">Where are you at?</label>
          <input
            type="text"
            className="edit-form-input input"
            placeholder="Location"
            name="location"
            required
            value={location}
            onChange={(e) => onChange(e)}
          />
          <label className="edit-input-label">Personal Website</label>
          <input
            type="text"
            className="edit-form-input input"
            placeholder="Website URL"
            name="website"
            value={website}
            required
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="edit-form-container box-shadow">
          <p className="edit-form-title">Bio</p>

          <label className="edit-input-label">
            Tell us a bit about yourself
          </label>
          <input
            type="text"
            className="edit-form-input input"
            placeholder="Bio"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="edit-form-container box-shadow">
          <p className="edit-form-title">Skill</p>
          <span className="required-text">*required</span>
          <label className="edit-input-label">
            List any skills that you have
          </label>

          <div className="edit-skills">
            {skillTags.map((skill, index) => {
              return (
                <div className="edit-skill tag" key={index}>
                  {skill}
                </div>
              );
            })}
            <button
              className="edit-add-btn icon btn-small"
              type="button"
              onClick={() => setDisplaySkillInput(!displaySkillInput)}
            >
              <ion-icon name="add-circle-outline"></ion-icon>
            </button>
          </div>
          {displaySkillInput && (
            <div>
              <input
                type="text"
                className="edit-form-input input"
                placeholder="Enter your skill"
                name="skill"
                onChange={(e) => onSkillChange(e)}
              />
              {"   "}
              <button
                className="btn-small"
                type="button"
                onClick={() => addSkill()}
              >
                <ion-icon name="add-circle-outline"></ion-icon>
              </button>
            </div>
          )}
        </div>

        <button
          className="edit-add-btn btn btn-light"
          onClick={() => setDisplaySocial(!displaySocial)}
          type="button"
        >
          <ion-icon name="add-circle-outline" className="icon"></ion-icon>
          Add Social Network
        </button>
        {displaySocial && (
          <div className="edit-form-container box-shadow">
            <p className="edit-form-title">Social Network</p>

            <label className="edit-input-label">
              <ion-icon
                name="logo-twitter"
                className="edit-social-icon"
              ></ion-icon>
            </label>
            <input
              type="text"
              className="edit-form-input input"
              placeholder="Twitter Url"
              name="twitter"
              value={twitter}
              onChange={(e) => onChange(e)}
            />
            <label className="edit-input-label">
              <ion-icon
                name="logo-youtube"
                className="edit-social-icon"
              ></ion-icon>
            </label>
            <input
              type="text"
              className="edit-form-input input"
              placeholder="Youtube Url"
              name="youtube"
              value={youtube}
              onChange={(e) => onChange(e)}
            />
            <label className="edit-input-label">
              <ion-icon
                name="logo-facebook"
                className="edit-social-icon"
              ></ion-icon>
            </label>
            <input
              type="text"
              className="edit-form-input input"
              placeholder="Facebook URL"
              name="facebook"
              value={facebook}
              onChange={(e) => onChange(e)}
            />
            <label className="edit-input-label">
              <ion-icon
                name="logo-instagram"
                className="edit-social-icon"
              ></ion-icon>
            </label>
            <input
              type="text"
              className="edit-form-input input"
              placeholder="Instagram URL"
              name="instagram"
              value={instagram}
              onChange={(e) => onChange(e)}
            />
            <label className="edit-input-label">
              <ion-icon
                name="logo-linkedin"
                className="edit-social-icon"
              ></ion-icon>
            </label>
            <input
              type="text"
              className="edit-form-input input"
              placeholder="Linkedin URL"
              name="linkedin"
              value={linkedin}
              onChange={(e) => onChange(e)}
            />
            <label className="edit-input-label">
              <ion-icon
                name="logo-github"
                className="edit-social-icon"
              ></ion-icon>
            </label>
            <input
              type="text"
              className="edit-form-input input"
              placeholder="Github Username"
              name="githubusername"
              value={githubusername}
              onChange={(e) => onChange(e)}
            />
          </div>
        )}

        <div className="edit-btn-container">
          <button className="btn btn-primary edit-apply-btn" type="submit">
            Apply Changes
          </button>
          <Link className="btn btn-light edit-return-btn" to="/dashboard">
            Go Back
          </Link>
        </div>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired,
  addEducation: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  addEducation,
  addExperience,
})(CreateProfile);
