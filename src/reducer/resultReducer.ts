import { UPDATED } from '../actions/types';

const initialState = {
    details: []
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case UPDATED:
            return {
                details: action.payload
            }
        default:
            return state;
    }
};

