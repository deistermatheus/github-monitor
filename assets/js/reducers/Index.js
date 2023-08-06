import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import commitReducer from './CommitReducer';

const reducers = combineReducers({
  form: formReducer,
  commitState: commitReducer,
});

export default reducers;
