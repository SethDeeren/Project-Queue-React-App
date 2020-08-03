import React, { Component } from 'react';
import '../styles/ProjectSearchList.css';
import { Link } from 'react-router-dom';
import { searchProjects } from '../actions';
import { connect } from 'react-redux';

import Navbar from './NavBar';

class ProjectSearchList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.searchProjects(this.props.searchTerm);
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="Search container">
          {this.props.projectList.map((project) => (
            <div class="result-item col-sm-12">
              <h4>{project.title} </h4>
              <Link className="link" to={`/projects/${project._id}`}>
                JOIN
              </Link>
              <Link className="link" to={`/projects/${project._id}/about`}>
                ABOUT
              </Link>
              <span>Project ID: {project.id}</span>
              {/* <p>{project.description}</p> */}
              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { projectList: state.searchProjects };
}

export default connect(mapStateToProps, { searchProjects })(ProjectSearchList);
