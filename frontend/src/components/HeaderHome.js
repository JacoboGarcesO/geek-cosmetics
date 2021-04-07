import React from 'react'
import Img from '../images/img_home.svg'
import { Link } from 'react-router-dom';
import NavBar from './Navbar';
const HeaderHome = () => {
    return (
        <header>
            <div className="container">
                <NavBar/>
                <div className="textos">
                    <h1>Jacobo Garcés</h1>
                    <h2>Geek Cosmetics</h2>
                    <p>¡Para hacer a nuestros clientes aún más hermosos!</p>
                    <Link to="/compras">Comprar</Link>
                </div>
                <img src={Img} alt="" />
            </div>
        </header>
    );
}

export default HeaderHome;