import React from 'react';
import {
    Link
  } from 'react-router-dom';
import PropTypes from 'prop-types';

const RepoList = (props) => {
  const {repositories} = props;
  return (repositories.map(repo => ( <li class="sidebar-brand" key={repo.name}>
    <Link> { repo.name }</Link>    
</li>)))
}

RepoList.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RepoList;
