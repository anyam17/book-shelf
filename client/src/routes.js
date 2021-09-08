import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout';
import Auth from './hoc/Auth';
import Home from './containers/Home';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Account from './containers/Account';
import BookAdd from './containers/BookAdd';
import BookMy from './containers/BookMy';
import Logout from './containers/Auth/Logout';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home, null)} />
                <Route path="/user" exact component={Auth(Account, true)} />
                <Route path="/login" exact component={Auth(Login, false)} />
                <Route path="/register" exact component={Auth(Register, false)} />
                <Route path="/add" exact component={Auth(BookAdd, true)} />
                <Route path="/my_books" exact component={Auth(BookMy, true)} />
                <Route path="/logout" exact component={Auth(Logout, true)} />
            </Switch>
        </Layout>
    )
}

export default Routes;