import React, { Component } from 'react';
import { connect } from "react-redux";
import { login } from "../actions";
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidUpdate(prevProps, prevState){
    if(localStorage.getItem("jwt")){
      this.props.history.push("/");
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = event => {
    event.preventDefault();
      this.props.login({username: this.state.username, password: this.state.password});
  };

  render() {
    if (this.props.isFetching) {
      return <h4>Loggin In ...</h4>;
    }
    return (
      <form className="login-form">
        <h3>Log In</h3>
          <input
            type="text"
            placeholder="User Name"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <button className="login-btn" onClick={this.submitHandler}>
            Log In
          </button>
      </form>
    );
  }
}

// export default Login;

const mapStateToProps = state => ({
  isFetching: state.fetching,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login }
)(Login);