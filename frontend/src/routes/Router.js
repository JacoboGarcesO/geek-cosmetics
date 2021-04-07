import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Catalogo from '../pages/Catalogo';

const Router = ()=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/catalogo" component={Catalogo} />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;