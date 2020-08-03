import axios from 'axios';
import {
  IS_LOGGED_IN,
  POST_PROJECT,
  FETCH_USER_PROJECTS,
  FETCH_EDIT_PROJECT,
  UPDATE_EDIT_PROJECT,
  USER_NAME,
  DELETE_USER_PROJECT,
  FETCH_PROJECTS,
  FETCH_PROJECT,
  FETCH_GROUPS,
} from './types';

// send the user information if the user is logged in
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: IS_LOGGED_IN, payload: res.data });
};

//
export const fetchUserName = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: USER_NAME, payload: res.data });
};

// post a user project
export const postUserProject = (project) => async (dispatch) => {
  const res = await axios.post('/api/project', project);

  dispatch({ type: POST_PROJECT, payload: res.data });
};

// find all user projects belonging to them

export const fetchUserProjects = () => async (dispatch) => {
  const res = await axios.get('/api/user/projects');
  dispatch({ type: FETCH_USER_PROJECTS, payload: res.data });
};

// fetching project for user to update

export const fecthUpdateProject = (projectId) => async (dispatch) => {
  const res = await axios.get(`/api/project/${projectId}/edit`);
  dispatch({ type: FETCH_EDIT_PROJECT, payload: res.data });
};

// update fetched project from above

export const updateProject = (project, projectId) => async (dispatch) => {
  const res = await axios.put(`/api/project/${projectId}?_method=PUT`, project);
  dispatch({ type: UPDATE_EDIT_PROJECT, payload: res.data });
};

//delete project projectId must be a string

export const deleteProject = (projectId) => async (dispatch) => {
  const res = await axios.delete(`/api/project/${projectId}`);
  dispatch({ type: DELETE_USER_PROJECT, payload: res.data });
};

//////////////////////////////// NO AUTHENTICATION ROUTES ////////////////////////////////////////////////

// search projects

export const searchProjects = (searchQuery) => async (dispatch) => {
  const res = await axios.get(`/api/projects?search=${searchQuery}`);
  dispatch({ type: FETCH_PROJECTS, payload: res.data });
};

// fetch a specific project to join

export const fetchProject = (projectId) => async (dispatch) => {
  const res = await axios.get(`/api/projects/${projectId}`);
  dispatch({ type: FETCH_PROJECT, payload: res });
};

// fetch groups for project above

export const fetchGroups = (projectId) => async (dispatch) => {
  const res = await axios(`/api/projects/${projectId}/groups`);
  dispatch({ type: FETCH_GROUPS, payload: res.data });
};
