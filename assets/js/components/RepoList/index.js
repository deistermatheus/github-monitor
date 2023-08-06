import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { updateAppQuery } from '../../actions';

const RepoList = (props) => {
  const { repositories, dispatch } = props;
  const createClickHandler = (repoName) => (e) => {
    e.preventDefault();
    dispatch(updateAppQuery({ repository: repoName }));
  };
  return (repositories.map((repo) => (
    <li className="sidebar-brand mr-2" key={repo.name}>
      <button onClick={createClickHandler(repo.name)} type="button" className="btn btn-outline-light btn-block mt-2 mb-2 mr-6 ml-6">{repo.name}</button>
    </li>
  )));
};

RepoList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default RepoList;
