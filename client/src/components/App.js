import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser, fetchUserName } from '../actions';

import Home from './Home';
import NewProjectForm from './NewProjectForm';
import UserDashboard from './UserDashBoard';
import EditProject from './EditProject';
import NotFoundPage from './NotFoundPage';
import Project from './Project';
import ProjectSearchList from './ProjectSearchList';

class App extends Component {
  async componentDidMount() {
    await this.props.fetchUser();
    this.props.fetchUserName();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(routerProps) => <Home {...routerProps} />}
          />
          <Route
            exact
            path="/projects"
            render={(routerProps) => <ProjectSearchList {...routerProps} />}
          />

          <Route
            exact
            path="/dashboard"
            render={(routerProps) => <UserDashboard {...routerProps} />}
          />
          <Route
            exact
            path="/project/new"
            render={(routerProps) => <NewProjectForm {...routerProps} />}
          />

          <Route
            exact
            path="/projects/:id"
            render={(routerProps) => <Project {...routerProps} />}
          />

          <Route
            exact
            path="/dashboard/edit/:projectId"
            render={(routerProps) => <EditProject {...routerProps} />}
          />

          <Route path="*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser, fetchUserName })(App);
