import React, { Component } from "react";
import axios from 'axios';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: ""
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    
    const endpoint = "https://one-line-a-day-2.herokuapp.com/api/register";
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log(res);
      })
      .then(() => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log({ Error: err });
      });
  };

  render() {
    const {username, firstname, lastname, email, password} = this.state;
    return (
      <form className="login-form">
        <h3>Register</h3>
        <input
          type="text"
          placeholder="User Name"
          name="username"
          value={username}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          placeholder="First Name"
          name="firstname"
          value={firstname}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastname"
          value={lastname}
          onChange={this.handleInputChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={this.handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={this.handleInputChange}
        />
        <button className="login-btn" onClick={this.handleSubmit}>
          Register
        </button>
      </form>
    );
  }
}

export default Register;

// export default connect(
//     mapStateToProps,
//     { addNote, getNotes, editNote }
//   )(AddNoteView);