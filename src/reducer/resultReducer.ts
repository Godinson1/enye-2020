import { SEARCH, LOADING_GET_RESULT, GET_RESULT, 
    ERROR_RESULT, ERROR, LOADING, USER_LOCATION, LOADING_STOP
 } from '../actions/types';

const initialState = {
    all: [],
    details: [],
    loading: false,
    loading_results: false,
    error: '',
    error_result: '',
    user: {}
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case LOADING:
            return {
                loading: true
            }
        case USER_LOCATION:
            return {
                user: action.payload
            }
        case LOADING_STOP:
            return {
                loading_results: false
            }
        case LOADING_GET_RESULT:
            return {
                loading_results: true
            }
        case GET_RESULT:
            return {
                all: action.payload,
                loading_results: false
            }    
        case SEARCH:
            return {
                details: action.payload,
                loading: false
            }
        case ERROR:
            return {
                error: action.payload,
                loading: false
            }
        case ERROR_RESULT:
            return {
                error_result: action.payload,
                loading_results: false
            }
        default:
            return state;
    }
};

