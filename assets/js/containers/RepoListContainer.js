import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import RepoList from '../components/RepoList';

class RepoListContainer extends React.Component {
  componentDidMount() {
    commitAPI.getRepositories();
  }

  render() {
    const { repositories } = this.props;
    return (
      <div>
        <RepoList repositories={repositories}/>
      </div>
    );
  }
}

RepoListContainer.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = store => ({
    repositories: store.commitState.repositories,
});

export default connect(mapStateToProps)(RepoListContainer);