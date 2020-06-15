//Imported Types, packages and helpers
import { LOADING, SEARCH, ERROR_LOGIN, SET_AUTHENTICATED,
         ERROR, LOGGING_OUT, ERROR_SIGNUP,
         LOGGED_OUT, USER_LOADING 
} from './types';
import axios from 'axios';
import { isEmail, signInError } from '../Helpers/firebase';
import { auth } from '../firebase';



//Handle Search request
export const Search =  (data: Object, history: any)  => async (dispatch: any) =>  {
        dispatch({ type: LOADING });
        try {
            const response = await axios.post('https://serene-anchorage-25424.herokuapp.com/places/search', data);
            console.log(response.data);
            dispatch({
                type: SEARCH,
                payload: response.data.data
            })
            history.push('/search');
        } catch (err) {
            dispatch({
                type: ERROR,
                payload: err.response.data
            })
            console.log(err.response);
        }

}



//SignIn User
export const LogIn = (data: any, history: any) => async (dispatch: any) => {

      //Dispatch loading user on button click and store form
      dispatch({ type: USER_LOADING });
    
      //Check if Invalid email - If true, return error else check
      //if user is online and connected to the internet
      //If connected, Sign in user else return connection message
      const isValidEmail = isEmail(data.email);
      if(!isValidEmail) {
            dispatch({
                type: ERROR_LOGIN,
                payload: 'Must be a valid email address'
            });
      } else {
        
        try {
            await auth.signInWithEmailAndPassword(data.email, data.password);
            dispatch({ type: SET_AUTHENTICATED });
            history.push('/home');
        } catch(err) {
            console.log(err);
            dispatch({
                type: ERROR_LOGIN,
                payload: signInError(err.code, data.email)
            })
        }
        
      }
};



//Register User
export const Register = (data: any, history: any) => async (dispatch: any) => {

    //Dispatch loading user on button click and store form
    dispatch({ type: USER_LOADING });


    //Check if Invalid email - If true, return error else check
    //if user is online and connected to the internet
    //If connected, Sign in user else return connection message
    const isValidEmail = isEmail(data.email);
    if(!isValidEmail) {
        dispatch({
            type: ERROR_SIGNUP,
            payload: 'Must be a valid email address'
        });
    } else {
      try {
        await auth.createUserWithEmailAndPassword(data.email, data.password);
        dispatch({ type: SET_AUTHENTICATED });
        history.push('/home');
      } catch(err) {
        console.log(err);
        dispatch({
            type: ERROR_SIGNUP,
            payload: signInError(err.code, data.email)
        });
      }
    }
}


//Logout User
export const logOut = () => async (dispatch: any) => {
    dispatch({ type: LOGGING_OUT });
    try {
        await auth.signOut();
        localStorage.removeItem('authUser');
        dispatch({ type: LOGGED_OUT });
        window.location.href = '/'
    } catch(err) {

    }
}

