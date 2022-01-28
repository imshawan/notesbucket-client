import {
    PROFILE_LOADED,
    PROFILE_UPDATED,
    PROFILE_OPS_FAILED,
    SET_PROFILE_OPEN
} from '../types';

const ProfileReducer = (state, action) => {
    switch (action.type) {
        case PROFILE_LOADED:
            return {
                ...state,
                loading: false,
                profile: action.payload.profile
                //status: { success: action.payload.success, message: action.payload.message }
            }
        case PROFILE_UPDATED:
            return {
                ...state,
                loading: false,
                status: { success: action.payload.status, message: action.payload.message }
            }
        case PROFILE_OPS_FAILED:
            return {
                ...state,
                loading: false,
                status: { success: false, message: action.payload }
            }
        case SET_PROFILE_OPEN:
            return {
                ...state,
                profile_open: action.payload
            }
        default:
            return state;
        }
      };
      
      export default ProfileReducer;