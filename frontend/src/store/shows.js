import { csrfFetch } from "./csrf.js";

const LOAD_SHOWS = "shows/loadShows";

const load = (shows) => ({
  type: LOAD_SHOWS,
  shows,
});

export const loadShows = () => async (dispatch) => {
    const response = await csrfFetch("/api/shows");
    
    const data = await response.json();
    console.log('hitttttt', data)
    dispatch(load(data));
  return response;
};

const initialState = {};

function showReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SHOWS:
        const newState = {...state}
        action.shows.forEach(ele => {
            newState[ele.id] = ele
        })
        console.log(newState, '28 of reeducer')
      return newState;
    default:
      return state;
  }
}

export default showReducer;
