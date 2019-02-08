import React from "react";
import "../App.css";
class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: ``
    };
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitHandler = event => {
    event.preventDefault();
    if (this.props.edit) {
      this.props.editNote(this.props.userId, this.props.match.params.noteId, {
        entry: this.state.entry,
        user_id: this.props.userId
      });
    } else {
      this.props.addNote(this.props.userId, {
        entry: this.state.entry,
        user_id: this.props.userId
      });
    }
    this.props.getNotes();
    this.props.history.push("/");
  };

  render() {
    if (this.props.userId === 0) {
      localStorage.removeItem("jwt");
      return <h4>Login</h4>;
    }
    return (
      <div className="form">
        <h2>{this.props.edit ? "Edit Note:" : "Create New Note:"}</h2>
        <form className="form-container" onSubmit={this.submitHandler}>
          {/* <input
            className="input-title"
            onChange={this.changeHandler}
            type=""
            autocomplete="off"
            name="title"
            value={this.state.title}
            placeholder={
              this.props.edit ? `${this.props.note.title}` : "Note Title"
            }
          /> */}
          <textarea
            className="input-content"
            onChange={this.changeHandler}
            name="entry"
            value={this.state.entry}
            placeholder={
              this.props.edit ? `${this.props.note.entry}` : "Entry Content"
            }
          />
          <div className="baseline" />
          <button className="md-button form-button">
            {this.props.edit ? "Update" : "Save"}
          </button>
        </form>
      </div>
    );
  }
}

export default AddNote;
