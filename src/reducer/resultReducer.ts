import { UPDATED, CLEAR, LOADING, LOADING_STOP } from '../actions/types';

const initialState = {
    details: [],
    loading: false
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case LOADING:
            return {
                loading: true
            }

        case LOADING_STOP:
            return {
                loading: false
            }
        case UPDATED:
            return {
                details: action.payload
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

