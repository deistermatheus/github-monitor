/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import * as commitAPI from '../api/CommitAPI';
import RepoList from '../components/RepoList';

// eslint-disable-next-line react/prefer-stateless-function
class RepoListContainer extends React.Component {
  render() {
    const { repositories, dispatch } = this.props;
    return (
      <div>
        <RepoList repositories={repositories} dispatch={dispatch} />
      </div>
    );
  }
}

RepoListContainer.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  repositories: store.commitState.repositories,
  dispatch: store.dispatch,
});

export default connect(mapStateToProps)(RepoListContainer);
