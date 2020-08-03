import React, { Component } from 'react';
import '../styles/Member.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      name: this.props.member.name,
      notes: this.props.member.notes,
      memberId: this.props.memberId,
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove() {
    this.props.deleteMember({
      ...this.state,
      groupId: this.props.id,
      projectId: this.props.projectId,
    });
    console.log('deletion');
  }

  toggleForm() {
    this.setState({ isEditing: !this.state.isEditing });
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  handleUpdate(evt) {
    evt.preventDefault();
    this.props.updateMember({
      ...this.state,
      groupId: this.props.groupId,
      projectId: this.props.projectId,
    });
    this.toggleForm();
  }
  handleToggle() {}

  render() {
    let result;

    if (this.state.isEditing) {
      result = (
        <CSSTransition key="editing" timeout={500} classNames="form">
          <form className="Member-edit-form" onSubmit={this.handleUpdate}>
            <input
              type="text"
              value={this.state.name}
              name="name"
              onChange={this.handleChange}
            />
            <button>Save</button>
          </form>
        </CSSTransition>
      );
    } else {
      result = (
        <CSSTransition key="normal" timeout={500} classNames="Member-name">
          <li className="Member-name" onClick={this.handleToggle}>
            {this.state.name}
          </li>
        </CSSTransition>
      );
    }
    return (
      <TransitionGroup
        className={this.props.completed ? 'Member completed' : 'Member'}
      >
        {result}
        <div className="Member-buttons">
          <button onClick={this.toggleForm}>
            <i class="fas fa-pen" />
            edit
          </button>
          <button onClick={this.handleRemove}>
            <i class="fas fa-trash" /> remove
          </button>
        </div>
      </TransitionGroup>
    );
  }
}

export default Member;
