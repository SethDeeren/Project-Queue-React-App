import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import projectReducer from './projectReducer';
import editProjectReducer from './editProjectReducer';
import searchProjectsReducer from './searchProjectsReducer';
import fetchProject from './fetchProjectReducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  projects: projectReducer,
  searchProjects: searchProjectsReducer,
  editProject: editProjectReducer,
  fetchedProject: fetchProject,
});
