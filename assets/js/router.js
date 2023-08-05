import React from 'react';
import {
    Link, BrowserRouter as Router, Route, Switch, withRouter
} from 'react-router-dom';
import CommitListContainer from './containers/CommitListContainer';
import RepoCreateContainer from './containers/RepoCreateContainer';
import RepoListContainer from './containers/RepoListContainer';

const RepoListWithRouterProps = withRouter(RepoListContainer)

export default (
    <Router>
        <div id="wrapper" className="toggled">

            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    <li className="sidebar-brand">
                        <Link to="/">
                            Github Monitor
                        </Link>
                    </li>
                </ul>
                <ul className="sidebar-nav">
                  <RepoListWithRouterProps/ >
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
