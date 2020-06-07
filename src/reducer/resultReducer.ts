import { UPDATED, CLEAR, LOADING, LOADING_STOP, NO_RESULT } from '../actions/types';

const initialState = {
    details: [],
    loading: false,
    message: null
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case LOADING:
            return {
                loading: true
            }

        case NO_RESULT:
            return {
                message: 'Ooops No Resutlt Found!',
                loading: false
            }
        case UPDATED:
            return {
                details: action.payload,
                loading: false
            }
        case CLEAR:
            return {
                details: [],
                loading: false
            }
        default:
            return state;
    }
};

