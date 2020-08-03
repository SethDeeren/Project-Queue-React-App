import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { searchProjects } from '../actions';

import logo from '../QUEUE no bg.png';
//import SearchResults from './SearchResults';
//import Authentication from './Authentication';
import '../styles/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    console.log('Home props are ' + this.props);
    this.state = { query: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(evt) {
    if (evt.charCode === 13) {
      this.handleSubmit();
    }
  }

  handleChange(evt) {
    this.setState({ query: evt.target.value });
  }

  handleSubmit() {
    this.props.searchProjects(this.state.query);
    this.props.history.push('/projects');
  }

  renderContent() {
    console.log('render content');
    if (!this.props.auth) {
      return (
        <div>
          {/* ////////////////////////////////////// BUTTON But slightly differen/////////////////////////////////////////////// */}
          <div class="container-button">
            <button
              onClick={() => {
                this.props.history.push('/auth/google');
              }}
            >
              <a style={{ textDecoration: 'none' }} href="/auth/google">
                Google Login
              </a>
            </button>
          </div>
        </div>
      );
    } else if (this.props.auth) {
      return (
        <div>
          {/* ///////////////////////////////////////////BUTTON///////////////////////////////////////////////////// */}
          <div class="container-button">
            <button
              onClick={() => {
                // this.props.history.push('/projects/new');
              }}
            >
              <Link to="/project/new">Create Project</Link>
            </button>{' '}
          </div>

          {/* ///////////////////////////////////////////BUTTON///////////////////////////////////////////////////// */}
          <div class="container-button">
            <button
              onClick={() => {
                // this.props.history.push('/projects/new');
              }}
            >
              <Link to="/dashboard">My Dashboard</Link>
            </button>{' '}
          </div>

          <div class="container-button">
            {/*///////////////////////////////////////// ALSO SLIGHTLY DIFFERENT BUTTON MATCHES LOGIN /////////////////////////////*/}
            <button
              onClick={() => {
                // this.props.history.push('/api/logout');
              }}
            >
              <a style={{ textDecoration: 'none' }} href="/api/logout">
                Logout
              </a>
            </button>
          </div>
        </div>
      );
    } else {
      return <div style={{ backgroundColor: 'orange' }}>Loading...</div>;
    }
  }

  render() {
    return (
      <div className="container">
        <img src={logo} alt="QUEUE" />
        {/* ////////////////////////////// SEARCH //////////////////////////////////// */}
        <div id="search">
          <input
            class="container-buttonvv"
            type="text"
            name="search"
            onKeyPress={this.handleKeyPress}
            placeholder="search projects by id, title or author"
            value={this.state.query}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit} class="container-button">
            <i class="fa fa-search"></i>
          </button>
        </div>
        {this.renderContent()}

        {/* //////////////////////////////////////////////FOOTER//////////////////////////////////////////////////// */}
        <div id="footer">
          <a href="/">About Us</a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, { searchProjects })(Home);
