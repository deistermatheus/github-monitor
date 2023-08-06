/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import store from './store';
import CommitListContainer from './containers/CommitListContainer';
import RepoCreateContainer from './containers/RepoCreateContainer';
import RepoListContainer from './containers/RepoListContainer';
import { updateAppQuery } from './actions';

const { dispatch } = store;

const clickHandler = (e) => {
  e.preventDefault();
  dispatch(updateAppQuery({}));
};

export default (
  <Router>
    <div id="wrapper" className="toggled">

      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-brand align-items-center">
            <a href="#" onClick={clickHandler}>
              Github Monitor
            </a>
          </li>
        </ul>
        <ul className="sidebar-nav">
          <RepoListContainer />
        </ul>
      </div>

      <div id="page-content-wrapper">
        <div className="container-fluid">
          <RepoCreateContainer />
          <Switch>
            <Route path="/" exact component={CommitListContainer} />
          </Switch>
        </div>
      </div>

    </div>
  </Router>
);
