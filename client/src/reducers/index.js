import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import auth from './auth';
import user from './user';
import books from './book';
import filter from './filter';

const rootReducer = combineReducers({
    auth,
    user,
    books,
    filter,
    form: formReducer,
});

export default rootReducer;