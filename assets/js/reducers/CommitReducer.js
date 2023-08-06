import * as types from '../actions/ActionTypes';

const initialState = {
  commits: [],
  repositories: [],
  fetchCommitState: {
    pagination: {
      next: null,
      previous: null,
      count: 0,
    },
    query: {
      page: 1,
    },
  },
  successMessage: false,
  errorMessage: null,
  isLoading: false,
};

const commitReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COMMITS_SUCCESS:
      return {
        ...state,
        commits: Object.values(action.payload.results),
        fetchCommitState: {
          ...state.fetchCommitState,
          pagination: {
            next: action.payload.next,
            previous: action.payload.previous,
            count: action.payload.count,
          },
        },
      };
    case types.CREATE_REPOSITORY_SUCCESS:
      return { ...state, successMessage: action.payload.successMessage };
    case types.SET_LOADING_STATE:
      return { ...state, isLoading: action.payload.isLoading };
    case types.SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload.errorMessage };
    case types.SET_SUCCESS_MESSAGE:
      return { ...state, successMessage: action.payload.successMessage };
    case types.GET_REPOSITORIES_SUCCESS:
      return {
        ...state,
        repositories: Object.values(action.payload),
      };
    case types.UPDATE_COMMIT_QUERY:
      return {
        ...state,
        fetchCommitState: {
          ...state.fetchCommitState,
          query: {
            ...action.payload,
          },
        },
      };
    default:
      return state;
  }
};

export default commitReducer;
