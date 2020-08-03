import React, { Component } from 'react';
import '../styles/Group.css';
import NewGroupMemberForm from './NewGroupMemberForm';
import Member from './Member';
import GroupNotes from './GroupNotes';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.group;
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
  }

  create(newMember) {
    //save to data base
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(newMember),
    };
    fetch(`/api/member/${newMember.projectId}`, options);

    //refresh parent data
    this.props.getData();
  }

  update(updateMember) {
    //update database
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(updateMember),
    };
    fetch(`/api/member/${this.props.projectId}?_method=PUT`, option);

    //refresh data taken care of by child element
  }

  updateNotes(updatedNotes) {
    //update database
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(updatedNotes),
    };

    fetch(`/api/projects/${this.props.id}/notes?_method=PUT`, option);

    //refresh data taken care of by child element
  }

  delete(deleteMember) {
    //Delete member
    const option = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(deleteMember),
    };
    fetch(`/api/members/${this.props.id}`, option);
    //refresh parent
    this.props.getData();
  }

  render() {
    return (
      <div>
        <h3>Group {this.props.index + 1}</h3>
        <hr />
        <NewGroupMemberForm
          className="add-member-form"
          createMember={this.create}
          groupId={this.props.groupId}
          projectId={this.props.projectId}
        />
        <h4>Members</h4>
        <ul>
          {this.state.members.map((m) => (
            <Member
              member={m}
              updateMember={this.update}
              deleteMember={this.delete}
              memberId={m._id}
              groupId={this.props.groupId}
              projectId={this.props.projectId}
            />
          ))}
          <hr />
        </ul>

        <GroupNotes
          groupNotes={this.props.groupNotes}
          updateNotes={this.updateNotes}
          id={this.props.id}
          projectId={this.props.projectId}
        />
      </div>
    );
  }
}

export default Group;
