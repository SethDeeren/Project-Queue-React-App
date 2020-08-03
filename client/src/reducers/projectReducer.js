import { FETCH_USER_PROJECTS } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_USER_PROJECTS:
      return action.payload;

    default:
      return state;
  }
}
