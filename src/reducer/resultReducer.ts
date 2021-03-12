//Imported types
import {
  SEARCH,
  LOADING_GET_RESULT,
  GET_RESULT,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  ERROR_LOGIN,
  ERROR_SIGNUP,
  LOGGED_OUT,
  LOGGING_OUT,
  ERROR_RESULT,
  ERROR,
  LOADING,
  USER_DETAIL,
  LOADING_STOP,
  USER_LOADING,
  LOADING_PHARMACY,
  LOADING_MEDICAL,
  LOADING_CLINIC,
  LOADING_HOSPITAL,
  USER_LOADED,
} from "../actions/types";

//Initialize state
const initialState = {
  all: [],
  details: [],
  user: {},
  loading: false,
  loading_user: false,
  loading_hospital: false,
  loading_clinic: false,
  loading_pharmacy: false,
  loading_medical: false,
  authenticated: false,
  loading_results: false,
  loading_logout: false,
  error: "",
  error_result: "",
  error_login: "",
  error_signup: "",
};

//Main reducer for handling types
export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        authenticated: true,
        loading_user: false,
      };
    case SET_UNAUTHENTICATED:
      return {
        authenticated: false,
        loading_user: false,
      };
    case USER_LOADING:
      return {
        loading_user: true,
      };
    case USER_LOADED:
      return {
        loading_user: false,
      };
    case LOADING:
      return {
        loading: true,
      };
    case LOADING_HOSPITAL:
      return {
        loading_hosptal: true,
      };
    case LOADING_MEDICAL:
      return {
        loading_medical: true,
      };
    case LOADING_PHARMACY:
      return {
        loading_pharmacy: true,
      };
    case LOADING_CLINIC:
      return {
        loading_clinic: true,
      };
    case LOGGING_OUT:
      return {
        loading_logout: true,
      };
    case LOGGED_OUT:
      return {
        loading_logout: false,
      };
    case USER_DETAIL:
      return {
        user: action.payload,
      };
    case LOADING_STOP:
      return {
        loading_results: false,
      };
    case LOADING_GET_RESULT:
      return {
        loading_results: true,
      };
    case GET_RESULT:
      return {
        all: action.payload,
        loading_results: false,
      };
    case SEARCH:
      return {
        details: action.payload,
        loading: false,
        loading_hospital: false,
        loading_clinic: false,
        loading_pharmacy: false,
        loading_medical: false,
      };
    case ERROR:
      return {
        error: action.payload,
        loading: false,
      };
    case ERROR_RESULT:
      return {
        error_result: action.payload,
        loading_results: false,
      };
    case ERROR_LOGIN:
      return {
        error_login: action.payload,
        loading_user: false,
      };
    case ERROR_SIGNUP:
      return {
        error_signup: action.payload,
        loading_user: false,
      };
    default:
      return state;
  }
}
