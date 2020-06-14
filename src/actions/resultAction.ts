//Imported Types, packages and helpers
import { LOADING, SEARCH, 
         ERROR, LOGGING_OUT, 
         LOGGED_OUT 
} from './types';
import axios from 'axios';
import { auth } from '../firebase'



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


//Logout User
export const logOut = (history: any) => async (dispatch: any) => {
    dispatch({ type: LOGGING_OUT });
    try {
        await auth.signOut();
        dispatch({ type: LOGGED_OUT });
        window.location.href = '/'
    } catch(err) {

    }
   
}

