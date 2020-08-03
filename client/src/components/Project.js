import React, { Component } from 'react';
import '../styles/Project.css';
import Navbar from './NavBar';
//import { connect } from 'react-redux';

//import { fetchProject, fetchGroups } from '../actions';

import Group from './Group';

class Project extends Component {
  constructor(props) {
    super(props);
    // Because of lifecylce method need empty project and groups to render then these values are filled once component mounts
    this.state = { project: { _id: '', title: '', groups: [], author: {} } };
    this.createGroups = this.createGroups.bind(this);
    this.getData = this.getData.bind(this);
  }

  getData() {
    fetch(`/api/projects/${this.props.match.params.id}`)
      .then((res) => res.json())
      .then((newProject) => this.setState({ project: newProject }));
  }

  createGroups() {
    return this.state.project.groups.map((group, index) => {
      return (
        <div className="group">
          <Group
            group={group}
            groupId={group._id}
            index={index}
            projectId={this.state.project._id}
            groupNotes={group.notes}
            key={group._id}
            getData={this.getData}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="header jumbotron">
          <h1 className="display-3">{this.state.project.title}</h1>
          <p>{this.state.project.description}</p>
          <p>By: {this.state.project.author.username}</p>
        </div>

        <div className="groups">{this.createGroups()}</div>
      </div>
    );
  }

  componentDidMount() {
    /*

      fetchProject is not working possibly issue with how it is written or returned in actions
      
      
      */
    // this.props.fetchProject(this.props.match.params.id);
    // this.setState({ project: this.props.project });
    this.getData();
  }
}

// function MapStateToProps(state) {
//   return { project: state.fetchedProject };
// }

export default Project;
