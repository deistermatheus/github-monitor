/* eslint-disable react/forbid-prop-types */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateAppQuery } from '../actions';
import CommitList from '../components/CommitList';
import CommitPaginationControl from '../components/CommitPaginationControl';

class CommitListContainer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(updateAppQuery({}, false));
  }

  render() {
    const {
      commits, dispatch, commitPagination, isLoading,
    } = this.props;
    return (
      <div>
        <CommitList commits={commits} dispatch={dispatch} isLoading={isLoading} />
        <CommitPaginationControl
          dispatch={dispatch}
          pagination={commitPagination}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

CommitListContainer.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
  commitPagination: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (store) => ({
  commits: store.commitState.commits,
  commitPagination: {
    ...store.commitState.fetchCommitState.pagination,
    page: store.commitState.fetchCommitState.query.page,
  },
  isLoading: store.commitState.isLoading,
});

export default connect(mapStateToProps)(CommitListContainer);
