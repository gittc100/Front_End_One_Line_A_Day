import React, { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getNotesById, deleteNote, getNotes } from "../actions";

import "../App.css";

// const ReactMarkdown = require("react-markdown/with-html");

class Note extends React.Component {
  constructor() {
    super();
    this.state = {
      delete: false,
      markdown: "regular"
    };
  }

  componentDidMount() {
    this.props.getNotesById(this.props.userId, this.props.match.params.noteId);
  }

  render() {
    if (this.props.userId === 0) {
      localStorage.removeItem("jwt");
      return <h4>Login</h4>;
    }
    if (this.props.isFetching) {
      return <h4>Loading items...</h4>;
    }
    return (
      <Fragment>
        <div className={`delete-${this.state.delete}`}>
          <div className="delete-container">
            <h3>Are you sure you want to delete this?</h3>
            <div className="btn-container">
              <button
                onClick={() => {
                  this.props.deleteNote(this.props.userId, this.props.match.params.noteId);
                  this.props.getNotes(this.props.userId);
                  this.props.history.push("/");
                }}
                className="delete-btn-yes"
              >
                Delete
              </button>
              <button
                onClick={() =>
                  this.setState({ ...this.state, delete: !this.state.delete })
                }
                className="delete-btn-no"
              >
                No
              </button>
            </div>
          </div>
        </div>
        <div className="note-wrapper">
          <nav className="sub-nav">
            <div className="sub-nav-links">
              <NavLink exact to={`/edit-note/${this.props.note.id}`}>
                <button className="sub-nav-btn sub-nav-links-fix">edit</button>
              </NavLink>
              <button
                className="sub-nav-btn"
                onClick={() =>
                  this.setState({ ...this.state, delete: !this.state.delete })
                }
              >
                delete
              </button>
            </div>
          </nav>
          <div className="note-body">
            <Fragment>
              <p>{this.props.note.entry}</p>
            </Fragment>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  note: state.note,
  userId: state.userID,
  isFetching: state.fetching,
  error: state.error
});

export default connect(
  mapStateToProps,
  { getNotesById, deleteNote, getNotes }
)(Note);
