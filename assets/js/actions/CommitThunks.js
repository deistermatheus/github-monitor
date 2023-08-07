import { reset } from 'redux-form';
import {
  createRepositorySuccess,
  getCommitsSuccess,
  getRepositoriesSuccess,
  updateLoadingState,
  updateCommitQuery,
  setErrorMessage,
  setSuccessMessage,
} from './CommitActions';

import {
  INFO_MESSAGE_EXPIRATION, REPOSITORY_ADD_REFRESH_DELAY, COMMITS_BASE_URL, REPOSITORIES_BASE_URL,
} from '../constants';

import { mapAxiosErrorToRedux } from './helpers';

export function setTemporaryState(key, payload) {
  return (dispatch) => {
    if (key === 'successMessage') {
      dispatch(setSuccessMessage(true));

      setTimeout(() => {
        dispatch(setSuccessMessage(false));
      }, INFO_MESSAGE_EXPIRATION);
    }

    if (key === 'errorMessage') {
      dispatch(setErrorMessage(payload));
      setTimeout(() => {
        dispatch(setErrorMessage(null));
      }, INFO_MESSAGE_EXPIRATION);
    }
  };
}

export function syncQueryToBrowserSearch() {
  return (dispatch, getState) => {
    const currentState = getState();
    const { query: commitQuery } = currentState.commitState.fetchCommitState;
    const { pathname } = window.location;
    // returns path: '/app/books'
    const searchParams = new URLSearchParams(window.location.search);
    // returns the existing query string: '?type=fiction&author=fahid'

    // eslint-disable-next-line no-restricted-syntax
    for (const key of searchParams.keys()) {
      searchParams.delete(key);
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(commitQuery)) {
      searchParams.set(key, value);
    }

    window.history.pushState({}, 'test', `${pathname}?${searchParams.toString()}`);
  };
}

export function refreshAppData(config = {}) {
  const { isFirstRender } = config;
  return (dispatch, getState, { axios }) => {
    const currentState = getState();
    const { query: commitQuery } = currentState.commitState.fetchCommitState;

    axios.get(REPOSITORIES_BASE_URL).then((response) => {
      dispatch(getRepositoriesSuccess({ ...response.data.results }));
    }).catch((error) => {
      mapAxiosErrorToRedux({ error, action: setTemporaryState, dispatch });
    });

    const timeout = isFirstRender ? 0 : REPOSITORY_ADD_REFRESH_DELAY;

    setTimeout(() => {
      axios.get(COMMITS_BASE_URL, { params: commitQuery })
        .then((response) => {
          dispatch(getCommitsSuccess({ ...response.data }));
        }).catch((error) => {
          mapAxiosErrorToRedux({ error, action: setTemporaryState, dispatch });
          // eslint-disable-next-line no-use-before-define
          dispatch(updateAppQuery({}));
        });
    }, timeout);
  };
}

export function updateAppQuery(payload, isFirstRender = false) {
  return (dispatch) => {
    dispatch(updateLoadingState(true));
    dispatch(updateCommitQuery(payload));
    dispatch(syncQueryToBrowserSearch());
    dispatch(refreshAppData({ isFirstRender }));
    dispatch(updateLoadingState(false));
  };
}

export function createRepository(formData, requestHeaders, formDispatch) {
  return (dispatch, _, { axios }) => {
    axios.post(REPOSITORIES_BASE_URL, formData, { headers: requestHeaders })
      .then((response) => {
        dispatch(createRepositorySuccess(response.data, true));
        dispatch(setTemporaryState('successMessage', true));
        formDispatch(reset('repoCreate'));
        return Promise.resolve(response.data.name);
      }).then((name) => {
        dispatch(updateAppQuery({ repository: name }));
        return Promise.resolve();
      }).catch((error) => {
        mapAxiosErrorToRedux({ error, action: setTemporaryState, dispatch });
      });
  };
}
