import axios from 'axios';
import {reset} from 'redux-form';
import store from '../store';
import {
  createRepositorySuccess, getCommitsSuccess, getRepositoriesSuccess,
} from '../actions/CommitActions';

export const getCommits = () => axios.get(`/api/commits/`)
  .then((response) => {
    store.dispatch(getCommitsSuccess({...response.data}));
  });

export const getRepositories = () => axios.get(`/api/repositories/`)
.then((response) => {
  store.dispatch(getRepositoriesSuccess({...response.data}));
});

export const createRepository = (values, headers, formDispatch) => axios.post('/api/repositories/', values, {headers})
  .then((response) => {
    store.dispatch(createRepositorySuccess(response.data, true));
    formDispatch(reset('repoCreate'));
  }).then(() => {
      setTimeout(() => {
        Promise.all([getCommits(), getRepositories()])
      }, 1500)
  })
  .catch((error) => {
    const err = error.response;
    console.log(err);
  });

