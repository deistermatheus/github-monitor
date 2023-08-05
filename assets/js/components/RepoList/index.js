import React from 'react';
import PropTypes from 'prop-types';

const addQuery = (props) => (key, value) => {
  let pathname = props.location.pathname;
  // returns path: '/app/books'
  let searchParams = new URLSearchParams(props.location.search);
  // returns the existing query string: '?type=fiction&author=fahid'

  console.log("wtf?")
  const keys = [...searchParams.keys()]
  keys.forEach(key => {
    searchParams.delete(key)
  })

  searchParams.set(key, value);
  
  props.history.push({
    pathname: pathname,
    search: searchParams.toString()
  })
}

const RepoList = (props) => {
  const { repositories, extraProps } = props;
  const addQueryToPath = addQuery(extraProps)
  return (repositories.map(repo => ( <li className="sidebar-brand" key={repo.name}>
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
