import React from 'react';
import { Link } from 'react-router-dom';

let contador = 0;

export const Navbar = () => {

    const animation = () => {
        let enlaces = document.getElementById("enlaces");
        if (contador === 0) {
            enlaces.className = ("enlaces dos")
            contador = 1;
        } else {
            enlaces.classList.remove("dos")
            enlaces.className = ("enlaces uno")
            contador = 0;
        }
    }

    return (
        <nav>
            <p onClick={animation} id="icono" className="icono"><i style={{ fontSize: '30px' }} className="fas fa-bars"></i></p>
            <Link to="/" className="p-icon"><i style={{ fontSize: '28px' }} className="icono fas fa-house-user"></i></Link>
            <div className="enlaces uno" id="enlaces">
                <Link to="/catalogo">Catálogo</Link>
                <Link to="/comprar">Comprar</Link>
                <Link to="/compras">Ver compras</Link>
            </div>
        </nav>
    )
}

export default Navbar;