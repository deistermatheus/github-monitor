/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { updateAppQuery } from '../../actions/CommitActions';

const CommitList = (props) => {
  const { commits, dispatch } = props;
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
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(updateAppQuery({ author: commit.author }));
                        }}
                      >
                        {commit.author}
                      </a>
                      {' '}
                      authored
                      {' '}
                      on
                      {' '}
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(updateAppQuery({ repository: commit.repository }));
                        }}
                      >
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
      )}
    </div>

  );
};

CommitList.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default CommitList;
