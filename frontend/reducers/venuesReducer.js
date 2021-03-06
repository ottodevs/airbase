import { RECEIVE_VENUES, RECEIVE_VENUE } 
  from '../actions/venuesActions';

const initState = {};

const venuesReducer = (state = initState, action) => {
  switch (action.type) {
    case RECEIVE_VENUES:
      return action.venues;
    case RECEIVE_VENUE:
      return Object.assign({}, state, { [action.id]: action.venue });
    default:
      return state;
  }
};

export default venuesReducer;