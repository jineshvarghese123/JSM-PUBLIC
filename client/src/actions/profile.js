import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS,
} from './constants';

// get current User profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Get All Profile
export const getProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//Get Profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Get Github Repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//create or update Current prfile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const res = await axios.post('/api/profile', formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );
      if (!edit) {
        history.push('/dashboard');
      }
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, 'danger'));
        });
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

//Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const res = await axios.put('/api/profile/experience', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience Added', 'success'));
    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const res = await axios.put('/api/profile/education', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education Added', 'success'));
    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Delete an experiance
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const res = await axios.delete(`api/profile/experience/${id}`, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience Removed', 'success'));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Delete an education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const res = await axios.delete(`api/profile/education/${id}`, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education Removed', 'success'));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//Delete an account & profile
export const deleteAccount = (id) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      await axios.delete(`api/profile`, config);
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: ACCOUNT_DELETED,
      });

      dispatch(
        setAlert('Your Account has been permenantly deleted', 'success')
      );
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};
