import React from 'react';
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

const CommitList = (props) => {
  const { commits, extraProps } = props;
  const addQueryToPath = addQuery(extraProps)
  return (
    <div>
      {commits.length !== 0 && (
        <div>
          <div className="card card-outline-secondary my-4">
            <div className="card-header">
              Commit List
            </div>

            <div className="card-body">
              {commits.map((commit, index) => (
                <div key={commit.sha}>
                  <div className="avatar">
                    <img alt={commit.author} className="img-author" src={commit.avatar} />
                  </div>
                  <div className="commit-details">
                    <p>
                      {commit.message}
                    </p>
                    <small className="text-muted">
                      <a href="#" onClick={(e) => {
                         e.preventDefault()
                         addQueryToPath('author', commit.author)
                      }}>
                      {commit.author}
                      </a>
                      {' '}
                      authored
                      {' '}
                      on
                      {' '}
                      <a href="#" onClick={(e) => {
                         e.preventDefault()
                         addQueryToPath('repository', commit.repository)
                      }}>
                      {commit.repository}
                      </a>
                      {' '}
                      at
                      {' '}
                      {new Date(commit.date).toLocaleString()}
                    </small>
                    {index !== commits.length - 1 && <hr />}
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      )
      
      }
    </div>

  );
};

CommitList.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommitList;
