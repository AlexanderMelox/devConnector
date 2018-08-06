<<<<<<< HEAD
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from '../actions/types';
=======
import { GET_PROFILE, PROFILE_LOADING } from '../actions/types';
>>>>>>> d628a25aa67d167bcc3505d4ad5efb1fed7b3785

const initialState = {
  profile: null,
  profiles: null,
  loading: false
<<<<<<< HEAD
}
=======
};
>>>>>>> d628a25aa67d167bcc3505d4ad5efb1fed7b3785

export default function(state = initialState, action) {
  switch(action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      }
<<<<<<< HEAD
    case CLEAR_CURRENT_PROFILE: 
      return {
        ...state,
        profile: null
      }
    default: 
      return state
  }
}
=======
    default: 
      return state;
  }
} 
>>>>>>> d628a25aa67d167bcc3505d4ad5efb1fed7b3785
