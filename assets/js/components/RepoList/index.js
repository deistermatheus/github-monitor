import React from 'react';
import {
    Link
  } from 'react-router-dom';
import PropTypes from 'prop-types';

const addQuery = (props) => (key, value) => {
  let pathname = props.location.pathname;
  // returns path: '/app/books'
  let searchParams = new URLSearchParams(props.location.search);
  // returns the existing query string: '?type=fiction&author=fahid'

  if(searchParams.has(key)){
     searchParams.delete(key)  
  }

  searchParams.append(key, value);
  
  props.history.push({
    pathname: pathname,
    search: searchParams.toString()
  })
}

const RepoList = (props) => {
  const { repositories, extraProps } = props;
  const addQueryToPath = addQuery(extraProps)
  return (repositories.map(repo => ( <li class="sidebar-brand" key={repo.name}>
    <a href="#" onClick={(e) => {
                         e.preventDefault()
                         addQueryToPath('repository', repo.name)
                      }}>
                      {repo.name}
                      </a>   
</li>)))
}

RepoList.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RepoList;
