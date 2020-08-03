import React, { Component } from "react";

class GroupNotes extends Component {
    constructor(props) {
        super(props);
        this.state = { groupNotes: this.props.groupNotes }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit() {
        this.props.updateNotes({ ...this.state, groupId: this.props.id, projectId: this.props.projectId })
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    render() {
        return (
            <div>
                <h4>Group Notes <i class='fas fa-pen' /></h4>
                <textarea
                    style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                    value={this.state.groupNotes}
                    name="groupNotes"
                    onChange={this.handleChange}
                />
                <button className="save-notes" onClick={this.handleSubmit}>Save</button>
            </div>
        )
    }
}

export default GroupNotes;