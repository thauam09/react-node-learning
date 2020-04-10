import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Inicio from './components/Inicio'
import Sobre from './components/Sobre'
import Header from './components/Header'
const Routes = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/" component={Home}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;