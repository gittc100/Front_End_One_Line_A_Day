import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import NotesListView from "./views/NotesListView";
import AddNoteView from "./views/AddNoteView";
import Note from "./components/Note";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
// import { registerUser } from "./actions";

class App extends Component {
  constructor() {
    super();
    this.state = {
      // loggedIn: false,
      // hardCodeUser: "user",
      // hardCodePass: "pass"
    };
  }

  // componentDidMount() {
  //   const loginUser = JSON.parse(localStorage.getItem("login-username"));
  //   const loginPass = JSON.parse(localStorage.getItem("login-password"));
  //   console.log(loginUser);
  //   console.log(loginPass);
  //   if (
  //     loginPass === this.state.hardCodePass &&
  //     loginUser === this.state.hardCodeUser &&
  //     this.state.loggedIn === false
  //   ) {
  //     this.setState({
  //       loggedIn: true
  //     }); 
  //   } else {
  //     this.setState({
  //       loggedIn: false
  //     });
  //   }
  // }

  // logOut = () => {
  //   localStorage.setItem("login-username", JSON.stringify(""));
  //   localStorage.setItem("login-password", JSON.stringify(""));
  //   window.location.reload();
  // };

  logOut = () => {
    localStorage.removeItem("jwt");
    // this.props.history.push("/");
  };

  render() {
    // if (!this.state.loggedIn) {
    //   return <Login />;
    // } else {
      return (
        <div className="App">
          <nav className="nav-main">
            <h1 className="nav-header">Lambda Notes</h1>
            <div className="nav-links-container">
              <NavLink className="nav-links" exact to="/">
                <button className="nav-main-btn">View Your Notes</button>
              </NavLink>
              <NavLink to="/create-note">
                <button className="nav-main-btn">+ Create New Note</button>
              </NavLink>
              <NavLink className="nav-links" to="/login">
                <button className="nav-main-btn">Login</button>
              </NavLink>
              <NavLink className="nav-links" to="/register">
                <button className="nav-main-btn">Register</button>
              </NavLink>
              <button className="nav-main-btn" onClick={this.logOut}>
                Log Out
              </button>
            </div>
          </nav>

          <Route exact path="/" component={NotesListView} />
          <Route path="/create-note" component={AddNoteView} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/notes/:noteId" component={Note} />
          <Route
            path="/edit-note/:noteId"
            render={props => (
              <AddNoteView {...props} note={this.props.note} edit />
            )}
          />
        </div>
      );
    // }
  }
}

export default App;
