import React from "react";
import PropTypes from "prop-types";
import { Audio } from "react-loader-spinner";
const Spinner = () => {
  return (
    <div
      style={{
        display: "block",
        width: "200px",
        margin: "10rem auto",
      }}
    >
      <Audio
        height="80"
        width="80"
        radius="9"
        color="#e67e22"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
};

Spinner.propTypes = {};

export default Spinner;
