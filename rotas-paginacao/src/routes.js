import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Header from './components/Header';
import Erro from './pages/Erro';
import Filme from './pages/Filme';

const Routes = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/sobre" component={Sobre}/>
                <Route exact path="/filme/:id" component={Filme}/>


                {/*Not Found Page Exception*/}
                <Route path="*" component={Erro}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
