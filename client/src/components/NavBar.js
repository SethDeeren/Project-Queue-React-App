import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../QUEUE no bg.png';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
class Navbar extends Component {
  componentDidMount() {
    this.props.fetchUserName();
  }
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light ">
        <Link class="navbar-brand" to="/">
          {' '}
          <img src={logo} alt="QUEUE" style={{ width: '150px' }} />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link class="nav-link" to="/">
                Home <span class="sr-only">(current)</span>
              </Link>
            </li>

            <li class="nav-item">
              <Link class="nav-link" to="/dashboard">
                My Projects
              </Link>
            </li>
            <li class="nav-item">
              <Link
                class="nav-link disabled"
                to="/"
                tabindex="-1"
                aria-disabled="true"
              >
                {this.props.name}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  return { auth: state.auth, name: state.user.name };
}
export default connect(mapStateToProps, actions)(Navbar);
