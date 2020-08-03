import { FETCH_EDIT_PROJECT } from '../actions/types';

export default function (
  state = { title: '', description: '', groups: [] },
  action
) {
  switch (action.type) {
    case FETCH_EDIT_PROJECT:
      return action.payload;

    default:
      return state;
  }
}
