import { RECEIVE_BOOKINGS, RECEIVE_BOOKINGS_ERRORS } from '../actions/bookingsActions';
const initState = {};

const bookingsReducer = (state = initState, action) => {
  switch (action.type) {
    case RECEIVE_BOOKINGS:
      return action.bookings;
    case RECEIVE_BOOKINGS_ERRORS:
      return Object.assign({}, state, { errors: action.errors });
    default:
      return state;
  }
};

export default bookingsReducer;