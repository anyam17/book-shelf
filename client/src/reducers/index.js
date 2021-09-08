import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import books from './book';
import filter from './filter';

const rootReducer = combineReducers({
    auth,
    user,
    books,
    filter
});

export default rootReducer;