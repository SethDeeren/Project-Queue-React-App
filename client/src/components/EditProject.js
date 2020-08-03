import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/NewProjectForm.css';
import { withRouter } from 'react-router-dom';
import Navbar from './NavBar';
import { fecthUpdateProject, updateProject } from '../actions';

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      groups: 1,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    await this.props.fecthUpdateProject(this.props.match.params.projectId);
    this.setState({
      title: this.props.project.title,
      description: this.props.project.description,
      groups: Object.keys(this.props.project.groups).length,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    // connect by redux in actions folder
    this.props.updateProject(this.state, this.props.match.params.projectId);
    this.props.history.push('/dashboard');
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <h1 className="display-4 title">Edit {this.props.project.title}</h1>

        <div className="container">
          <form id="create-project-form">
            <div className="form-group">
              <label for="formGroupExampleInput">Title</label>
              <input
                type="text"
                class="form-control"
                id="formGroupExampleInput"
                placeholder="Give your project a title."
                name="title"
                onChange={this.handleChange}
                value={this.state.title}
              />
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput2">Description</label>
              <textarea
                class="form-control"
                placeholder="Tells us about your project idea."
                value={this.state.description}
                name="description"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group group-inputs">
              <div className="num-input">
                <label># Groups</label>
                <input
                  className="form-control"
                  type="number"
                  min="1"
                  name="groups"
                  onChange={this.handleChange}
                  value={this.state.groups}
                />
              </div>
            </div>
            <button className="btn btn-primary" onClick={this.handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ editProject }) {
  return { project: editProject };
}

// connect(null, actions) gives us access to all actions in actions folder
export default connect(mapStateToProps, { fecthUpdateProject, updateProject })(
  withRouter(EditProject)
);
