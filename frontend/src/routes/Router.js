import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Catalogo from '../pages/Catalogo';
import Compra from '../pages/Compra';
import CompraFase2 from '../pages/CompraFase2';
import VerDetalle from '../pages/VerDetalle';
import VerHistorialCompras from '../pages/VerHistorialCompras';

const Router = ()=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/catalogo" component={Catalogo} />
                <Route path="/comprar" component={Compra} />
                <Route path="/comprar-fase-2" component={CompraFase2} />
                <Route path="/ver-detalle" component={VerDetalle} />
                <Route path="/compras" component={VerHistorialCompras} />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;