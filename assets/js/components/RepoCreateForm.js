/* eslint-disable react/forbid-prop-types */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const renderField = ({
  input, placeholder, className, type, meta: { touched, error, invalid },
}) => (
  <div>
    <input
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...input}
      placeholder={placeholder}
      className={`${className} ${touched && invalid ? 'is-invalid' : ''}`}
      type={type}
    />
    {touched
        && ((error && (
          <div className="invalid-feedback">
            {error}
          </div>
        )))}
  </div>
);

renderField.propTypes = {
  input: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

const RepoCreateForm = (props) => {
  const {
    successMessage, handleSubmit, pristine, submitting, errorMessage,
  } = props;
  return (
    <div>
      {successMessage
        && (
          <div className="alert alert-success" role="alert">
            Repository added successfully!
          </div>
        )}
      {errorMessage && (
      <div className="alert alert-danger" role="alert">
        { errorMessage }
      </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col-10">
            <Field
              name="name"
              placeholder="Enter the repository name, must match {user}/{repo}"
              className="form-control"
              component={renderField}
              type="text"
            />
          </div>
          <div className="col-2">
            <button disabled={pristine || submitting} className="btn btn-block btn-primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

RepoCreateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  successMessage: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/require-default-props
  errorMessage: PropTypes.oneOf([PropTypes.string, null]),
};

const validate = (values) => {
  const { username } = document.getElementById('main').dataset;
  const errors = {};
  if (!values.name || !values.name.startsWith(`${username}/`)) {
    errors.name = `Repository must belong to you (eg: ${username}/repo-name)`;
  } else if (!(values.name.replace(`${username}/`, '').length)) {
    errors.name = 'Repository name cannot be blank!';
  }
  return errors;
};

export default reduxForm({
  form: 'repoCreate',
  validate,
})(RepoCreateForm);
