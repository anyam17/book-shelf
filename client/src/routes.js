import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout';
import Auth from './hoc/Auth';
import Home from './containers/Home';
import Book from './components/Book/Book';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Account from './containers/Account';
import BookAdd from './containers/BookAdd';
import BookMy from './containers/BookMy';
import Favorite from './containers/Favorite';
import Users from './containers/Admin/Users';
import AllBooks from './containers/Admin/AllBooks';
import Logout from './containers/Auth/Logout';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home, null, 0)} />
                <Route path="/book/:id" exact component={Auth(Book, null, 0)} />
                <Route path="/user" exact component={Auth(Account, true, 0)} />
                <Route path="/add" exact component={Auth(BookAdd, true, 0)} />
                <Route path="/my_books" exact component={Auth(BookMy, true, 0)} />
                <Route path="/logout" exact component={Auth(Logout, true, 0)} />
                <Route path="/favorite" exact component={Auth(Favorite, true, 0)} />

                <Route path="/users" exact component={Auth(Users, true, 1)} />
                <Route path="/books" exact component={Auth(AllBooks, true, 1)} />
                
                <Route path="/login" exact component={Auth(Login, false, 0)} />
                <Route path="/register" exact component={Auth(Register, false, 0)} />
            </Switch>
        </Layout>
    )
}

export default Routes;