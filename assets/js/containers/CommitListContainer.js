import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import CommitList from '../components/CommitList';
import CommitPaginationControl from '../components/CommitPaginationControl';

class CommitListContainer extends React.Component {
  componentDidMount() {
    commitAPI.getCommits(this.getQueryParamsForApiCall({ params: this.getQueryParamsForApiCall()}));
  }

  getQueryParamsForApiCall(){
      const rawSearch = new URLSearchParams(this.props.location.search); 
      return Object.fromEntries(rawSearch.entries())    
  }

  componentDidUpdate(prevProps){
    if(this.props.location.search !== prevProps.location.search){
       commitAPI.getCommits({ params: this.getQueryParamsForApiCall()})
    }
  }

  render() {
    const {commits, ...extraProps} = this.props;
    return (
      <div>
        <CommitList commits={commits} extraProps={extraProps}/>
        <CommitPaginationControl extraProps={extraProps}/>
      </div>
    );
  }
}

CommitListContainer.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = store => ({
  commits: store.commitState.commits,
});

export default connect(mapStateToProps)(CommitListContainer);
