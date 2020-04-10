import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Header from './components/Header';
import Erro from './pages/Erro';
import Painel from './pages/Painel/Painel';
import { autenticado } from './auth'

const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        autenticado() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{ pathname: '/', state: {from: props.location} }}/>
        )
    )}/>
);

const Routes = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/sobre" component={Sobre}/>
                <PrivateRoute exact path="/painel" component={Painel}/>

                {/*Not Found Page Exception*/}
                <Route path="*" component={Erro}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
