import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProjects, fetchUser, deleteProject } from '../actions';
import { Link, withRouter } from 'react-router-dom';

import '../styles/UserDashboard.css';

import Navbar from './NavBar';

class UserDashBoard extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    this.props.deleteProject(e.target.value);
    this.props.fetchUserProjects();
  }

  componentDidMount() {
    this.props.fetchUserProjects();
  }

  renderProjects() {
    return this.props.projects.reverse().map((project) => {
      let projectPath = `/dashboard/edit/${project._id}`;
      return (
        <div
          className="card"
          style={{ width: '18rem', margin: '5px' }}
          key={project._id}
        >
          <div class="card-body">
            <h5 class="card-title">{project.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              Created On: {new Date(project.dateCreated).toLocaleDateString()}
            </h6>
            <p class="card-text">{project.description.substring(0, 25)}</p>
            <Link
              style={{ color: '#698474' }}
              to={projectPath}
              class="card-link"
            >
              Edit
            </Link>
            <button
              style={{ color: 'red' }}
              value={project._id}
              onClick={this.handleDelete}
              class="card-link"
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <Navbar />
        <h1>My Projects</h1>
        <h4 style={{ textAlign: 'center', color: '#698474' }}>
          <button>
            <Link style={{ color: '#698474' }} to="/project/new">
              Create New
            </Link>
          </button>
        </h4>
        <div
          className="container"
          style={{ flexDirection: 'row', flexWrap: 'wrap' }}
        >
          {this.renderProjects()}
          <div
            className="fixed-action-btn"
            style={{ color: '#698474', bottom: '45px; right: 24px;' }}
          ></div>
        </div>
      </div>
    );
  }
}

// res.data becomes projects
function mapStateToProps(state) {
  return { projects: state.projects };
}

export default connect(mapStateToProps, {
  fetchUserProjects,
  fetchUser,
  deleteProject,
})(withRouter(UserDashBoard));
