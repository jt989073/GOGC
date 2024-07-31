import { csrfFetch } from "./csrf.js";

const LOAD_SHOWS = "shows/loadShows";

const load = (shows) => ({
  type: LOAD_SHOWS,
  shows,
});

export const loadShows = () => async (dispatch) => {
  const response = await csrfFetch("/api/shows");

  const data = await response.json();
  dispatch(load(data));
  return response;
};

const initialState = {};

function showReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SHOWS:
      state = { ...state };
      action.shows.forEach((ele) => {
        state[ele.id] = ele;
      });
      return state;
    default:
      return state;
  }
}

export default showReducer;
