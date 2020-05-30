import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login/index';
import Expenses from './pages/Expenses';
import Home from './pages/Home';
import Payments from './pages/Payments';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/expenses" component={Expenses}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/payments" component={Payments}/>
            </Switch>
        </BrowserRouter>
    );
}