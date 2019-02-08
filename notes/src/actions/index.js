import axios from "axios";

export const FETCH_NOTES_START = "FETCH_NOTES_START";
export const FETCH_NOTES_SUCCESS = "FETCH_NOTES_SUCCESS";
export const FETCH_NOTES_FAILURE = "FETCH_NOTES_FAILURE";

export const FETCH_NOTES_BY_SORT_START = "FETCH_NOTES_BY_SORT_START";
export const FETCH_NOTES_BY_SORT_SUCCESS = "FETCH_NOTES_BY_SORT_SUCCESS";
export const FETCH_NOTES_BY_SORT_FAILURE = "FETCH_NOTES_BY_SORT_FAILURE";

export const FETCH_NOTES_BY_ID_START = "FETCH_NOTES_BY_ID_START";
export const FETCH_NOTES_BY_ID_SUCCESS = "FETCH_NOTES_BY_ID_SUCCESS";
export const FETCH_NOTES_BY_ID_FAILURE = "FETCH_NOTES_BY_ID_FAILURE";

export const ADD_NOTE_START = "ADD_NOTE_START";
export const ADD_NOTE_SUCCESS = "ADD_NOTE_SUCCESS";
export const ADD_NOTE_FAILURE = "ADD_NOTE_FAILURE";

export const DELETE_NOTE_START = "DELETE_NOTE_START";
export const DELETE_NOTE_SUCCESS = "DELETE_NOTE_SUCCESS";
export const DELETE_NOTE_FAILURE = "DELETE_NOTE_FAILURE";

export const EDIT_NOTE_START = "EDIT_NOTE_START";
export const EDIT_NOTE_SUCCESS = "EDIT_NOTE_SUCCESS";
export const EDIT_NOTE_FAILURE = "EDIT_NOTE_FAILURE";

export const LOGIN_USER_START = "LOGIN_USER_START";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const addNote = (userID, item) => dispatch => {
  dispatch({ type: ADD_NOTE_START });
  const token = localStorage.getItem("jwt");
  const options = {
    headers: {
      Authorization: token
    }
  };
  axios
    .post(
      `https://one-line-a-day-2.herokuapp.com/api/users/${userID}/entries`,
      item,
      options
    )
    .then(response => {
      console.log(response);
      dispatch({
        type: ADD_NOTE_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => dispatch({ type: ADD_NOTE_FAILURE, payload: err }));
};

export const getNotes = userID => dispatch => {
  dispatch({ type: FETCH_NOTES_START });
  console.log(userID);
  const token = localStorage.getItem("jwt");
  const options = {
    headers: {
      Authorization: token
    }
  };
  axios
    .get(
      `https://one-line-a-day-2.herokuapp.com/api/users/${userID}/entries`,
      options
    )
    .then(response => {
      console.log("fetch finished");
      dispatch({ type: FETCH_NOTES_SUCCESS, payload: response.data });
    })
    .catch(err => dispatch({ type: FETCH_NOTES_FAILURE, payload: err }));
};

export const getNotesBySort = sortType => dispatch => {
  dispatch({ type: FETCH_NOTES_BY_SORT_START });
  axios
    .get("https://fe-notes.herokuapp.com/note/get/all")
    .then(response => {
      console.log("fetch finished");
      let result = response.data.sort(sortType);
      console.log(result);
      dispatch({
        type: FETCH_NOTES_BY_SORT_SUCCESS,
        payload: result
      });
    })
    .catch(err =>
      dispatch({ type: FETCH_NOTES_BY_SORT_FAILURE, payload: err })
    );
};

export const getNotesById = (userID, entryID) => dispatch => {
  dispatch({ type: FETCH_NOTES_BY_ID_START });
  const token = localStorage.getItem("jwt");
  const options = {
    headers: {
      Authorization: token
    }
  };
  axios
    .get(
      `https://one-line-a-day-2.herokuapp.com/api/users/${userID}/entries/${entryID}`,
      options
    )
    .then(response => {
      console.log("fetch finished", response.data);
      console.log(userID, entryID);
      dispatch({ type: FETCH_NOTES_BY_ID_SUCCESS, payload: response.data[0] });
    })
    .catch(err => dispatch({ type: FETCH_NOTES_BY_ID_FAILURE, payload: err }));
};

export const deleteNote = (userID, entryID) => dispatch => {
  dispatch({ type: DELETE_NOTE_START });
  const token = localStorage.getItem("jwt");
  const options = {
    headers: {
      Authorization: token
    }
  };
  axios
    .delete(
      `https://one-line-a-day-2.herokuapp.com/api/users/${userID}/entries/${entryID}`,
      options
    )
    .then(response => {
      console.log(response);
      dispatch({
        type: DELETE_NOTE_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => dispatch({ type: DELETE_NOTE_FAILURE, payload: err }));
};

export const editNote = (userID, entryID, item) => dispatch => {
  dispatch({ type: EDIT_NOTE_START });
  const token = localStorage.getItem("jwt");
  const options = {
    headers: {
      Authorization: token
    }
  };
  axios
    .put(
      `https://one-line-a-day-2.herokuapp.com/api/users/${userID}/entries/${entryID}`,
      item,
      options
    )
    .then(response => {
      console.log(response);
      dispatch({
        type: EDIT_NOTE_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => dispatch({ type: EDIT_NOTE_FAILURE, payload: err }));
};

export const login = item => dispatch => {
  dispatch({ type: LOGIN_USER_START });
  axios
    .post("https://one-line-a-day-2.herokuapp.com/api/login", item)
    .then(res => {
      console.log(res);
      localStorage.setItem("jwt", res.data.token);
      console.log(res.data.id);
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: res.data.id
      });
    })
    .catch(err => dispatch({ type: LOGIN_USER_FAILURE, payload: err }));
};
