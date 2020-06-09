import { LOADING, SEARCH, GET_RESULT, LOADING_GET_RESULT, ERROR, ERROR_RESULT } from './types';
import axios from 'axios';



export const Search =  (data: Object, history: any)  => async (dispatch: any) =>  {
        dispatch({ type: LOADING });
        try {
            const response = await axios.post('http://localhost:4000/places/search', data);
            console.log(response.data);
            dispatch({
                type: SEARCH,
                payload: response.data.data
            })
            history.push('/search');
        } catch (err) {
            dispatch({
                type: ERROR,
                payload: err.response.data.error
            })
            console.log(err.response);
        }

}


export const Results =  (history: any)  => async (dispatch: any) =>  {
    dispatch({ type: LOADING_GET_RESULT });
    try {
        const response = await axios.get('http://localhost:4000/places');
        console.log(response.data.places)
        dispatch({
            type: GET_RESULT,
            payload: response.data.places
        })
        history.push('/results')
    } catch (err) {
        dispatch({
            type: ERROR_RESULT,
            payload: err.response.data
        })
        console.log(err);
    }

}