import * as types from './ActionTypes';
import { omitUndefined } from './helpers';

export const createRepositorySuccess = (response) => ({
  type: types.CREATE_REPOSITORY_SUCCESS,
  payload: { response },
});

export const getCommitsSuccess = (commitsResponse) => ({
  type: types.GET_COMMITS_SUCCESS,
  payload: commitsResponse,
});

export const getRepositoriesSuccess = (repositories) => ({
  type: types.GET_REPOSITORIES_SUCCESS,
  payload: repositories,
});

export const updateCommitQuery = (payload) => ({
  type: types.UPDATE_COMMIT_QUERY,
  payload: {
    ...omitUndefined(payload),
  },
});

export const updateLoadingState = (state = false) => ({
  type: types.SET_LOADING_STATE,
  payload: {
    isLoading: state,
  },
});

export const setSuccessMessage = (state = false) => ({
  type: types.SET_SUCCESS_MESSAGE,
  payload: {
    successMessage: state,
  },
});

export const setErrorMessage = (message) => ({
  type: types.SET_ERROR_MESSAGE,
  payload: {
    errorMessage: message,
  },
});
