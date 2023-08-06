import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createRepository } from '../actions';
import Form from '../components/RepoCreateForm';

class RepoCreateContainer extends React.Component {
  submit = (values, formDispatch) => {
    const token = document.getElementById('main').dataset.csrftoken;
    const [, name] = values.name.split('/');
    const formData = { ...values, name };
    // eslint-disable-next-line react/prop-types
    const { dispatch } = this.props;
    dispatch(createRepository(formData, { 'X-CSRFToken': token }, formDispatch));
  };

  render() {
    const { successMessage, errorMessage } = this.props;
    return (
      <Form
        onSubmit={this.submit}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    );
  }
}

RepoCreateContainer.propTypes = {
  successMessage: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/require-default-props
  errorMessage: PropTypes.string,
};

const mapStateToProps = (store) => ({
  successMessage: store.commitState.successMessage,
  errorMessage: store.commitState.errorMessage,
});

export default connect(mapStateToProps)(RepoCreateContainer);
