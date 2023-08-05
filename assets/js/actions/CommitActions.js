import * as types from './ActionTypes';

export const createRepositorySuccess = (response, successMessage) => ({
  type: types.CREATE_REPOSITORY_SUCCESS,
  payload: {response, successMessage},
});

export const getCommitsSuccess = commits => ({
  type: types.GET_COMMITS_SUCCESS,
  payload: commits,
});

export const getRepositoriesSuccess = repositories => ({
  type: types.GET_REPOSITORIES_SUCCESS,
  payload: repositories,
});
