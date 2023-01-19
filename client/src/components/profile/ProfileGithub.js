import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <div className="profile-github-repos">
      {repos.map((repo, index) => {
        return (
          <div className="profile-github-repo box-shadow" key={index}>
            <a
              href={repo.html_url}
              className="profile-github-repo-title"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ion-icon name="logo-github" className="icon"></ion-icon>
              {repo.name}
            </a>

            <p className="profile-github-repo-description">
              {typeof repo.description === "string" &&
              repo.description.length > 60
                ? `${repo.description.slice(0, 40)}...`
                : repo.description}
            </p>
            <div className="profile-github-repo-badge">
              <ul className="profile-github-repo-badge-list">
                <li>
                  <span className="icon">
                    <ion-icon name="star-outline"></ion-icon>
                  </span>
                  Stars: {repo.stargazers_count}
                </li>
                <li>
                  <span className="icon">
                    <ion-icon name="eye-outline" className="icon"></ion-icon>
                  </span>
                  Watchers: {repo.watchers_count}
                </li>
                <li>
                  <span className="icon">
                    <ion-icon
                      name="share-social-outline"
                      className="icon"
                    ></ion-icon>
                  </span>
                  Forks: {repo.forks_count}
                </li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
