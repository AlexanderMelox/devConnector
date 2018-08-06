import axios from 'axios';
<<<<<<< HEAD

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from './types';
=======
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS } from './types';
>>>>>>> d628a25aa67d167bcc3505d4ad5efb1fed7b3785

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile')
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_PROFILE,
      payload: {}
    }));
}

<<<<<<< HEAD
// Clear profile
=======
// Profile loading
>>>>>>> d628a25aa67d167bcc3505d4ad5efb1fed7b3785
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
<<<<<<< HEAD
}

// Profile loading
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
=======
>>>>>>> d628a25aa67d167bcc3505d4ad5efb1fed7b3785
}