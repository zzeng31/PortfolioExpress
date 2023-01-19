import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";

const AddEducation = ({ addEducation }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const { school, degree, fieldofstudy, from, to, description, current } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <form
      className="edit-form"
      onSubmit={(e) => {
        e.preventDefault();
        addEducation(formData, navigate);
      }}
    >
      <p className="edit-form-title title-primary">Add Your Education</p>
      <div className="edit-form-container box-shadow">
        <p className="edit-form-title">Education</p>

        <label className="edit-input-label">
          Add any school or bootcamp that you have attended
        </label>
        <input
          type="text"
          className="edit-form-input input"
          placeholder="* School or Bootcamp"
          name="school"
          value={school}
          required
          onChange={onChange}
        />
        <label className="edit-input-label">Degree or Certificate</label>
        <input
          type="text"
          className="edit-form-input input"
          placeholder="* Degree or Certificate"
          name="degree"
          value={degree}
          onChange={onChange}
        />
        <label className="edit-input-label">Field of Study</label>
        <input
          type="text"
          className="edit-form-input input"
          placeholder="Field of Study"
          name="fieldofstudy"
          value={fieldofstudy}
          onChange={onChange}
        />

        <label className="edit-input-label"> Description</label>
        <textarea
          type="text"
          cols="30"
          rows="5"
          className="edit-form-textarea input "
          placeholder="Job Description"
          name="description"
          value={description}
          onChange={onChange}
        />
        <div>
          <span className="edit-input-label"> Current</span>{" "}
          <input
            type="checkbox"
            checked={current}
            style={{ marginLeft: "1rem" }}
            placeholder="current"
            name="current"
            value={current}
            onChange={() => {
              setFormData({ ...formData, current: !current });
            }}
          />
        </div>
        <div className="edit-date-container">
          <label className="edit-input-label">Start date:</label>

          <input
            type="date"
            className="edit-form-date"
            min="1070-01-01"
            name="from"
            value={from}
            onChange={onChange}
          />
          <label className={`edit-input-label ${current ? `hidden` : ``}`}>
            End date:
          </label>

          <input
            type="date"
            className={`edit-form-date ${current ? `hidden` : ``}`}
            min="1970-01-01"
            disabled={current}
            name="to"
            value={to}
            onChange={onChange}
          />
        </div>

        <span className="edit-add-btn">
          <ion-icon name="add-circle-outline" className="icon"></ion-icon>
          Add more Education
        </span>
      </div>
      <div className="edit-btn-container">
        <button className="btn btn-primary edit-apply-btn" type="submit">
          Apply Changes
        </button>
        <Link className="btn btn-light edit-return-btn" to="/create">
          Go Back
        </Link>
      </div>
    </form>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
