import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

class NewGroupMemberForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', notes: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      notes: '',
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.createMember({
      ...this.state,
      groupId: this.props.groupId,
      projectId: this.props.projectId,
    });
    this.setState({ name: '', notes: '' });
  }
  render() {
    return (
      <form className="add-member-form" onSubmit={this.handleSubmit}>
        {/* <label htmlFor="newMember">Join Group</label> */}
        <input
          id="newMember"
          placeholder="sign up for group here"
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <button>Join</button>
      </form>
    );
  }
}

export default NewGroupMemberForm;
