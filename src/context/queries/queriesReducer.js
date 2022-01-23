import {
    RESPONSE_SENT,
    RESPONSE_SENDING_FAILED
} from '../types';

const QueriesReducer = (state, action) => {
    switch (action.type) {
        case RESPONSE_SENT:
            return {
            ...state,
            loading: false,
            status: { success: action.payload.success, message: action.payload.message }
            }
        case RESPONSE_SENDING_FAILED:
            return {
            ...state,
            loading: false,
            status: { success: false, message: action.payload.message ? action.payload.message : action.payload }
            }
        default:
            return state;
        }
      };
      
      export default QueriesReducer;