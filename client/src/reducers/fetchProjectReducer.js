import { FETCH_PROJECT } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_PROJECT:
      return action.payload;

    default:
      return state;
  }
}
