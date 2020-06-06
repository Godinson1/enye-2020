import { combineReducers } from 'redux';
import userReducer from './resultReducer';

export default combineReducers({
    users: userReducer
});