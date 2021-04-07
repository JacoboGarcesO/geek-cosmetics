import React from 'react'
import Img from '../images/img_home.svg'
import { saveToLocal, getFromLocal } from '../functions/localStorage';
let contador = 0;

const HeaderHome = () => {

    const animation = () => {
        let enlaces = document.getElementById("enlaces");
        if (contador == 0) {
            enlaces.className = ("enlaces dos")
            contador = 1;
        } else {
            enlaces.classList.remove("dos")
            enlaces.className = ("enlaces uno")
            contador = 0;
        }
    }

    return (
        <header>
            <div className="container">
                <nav>
                    <p onClick={animation} id="icono" className="icono"><i style={{fontSize:'30px'}} className="fas fa-bars"></i></p>
                    <div className="enlaces uno" id="enlaces">
                        <a href="">Acerca de</a>
                        <a href="">Catálogo</a>
                        <a href="">Comprar</a>
                    </div>
                </nav>
                <div className="textos">
                    <h1>Jacobo Garcés</h1>
                    <h2>Geek Cosmetics</h2>
                    <p>Para mejorar tu belleza corporal...</p>
                    <a href="#">Comprar</a>
                </div>
                <img src={Img} alt="" />
            </div>
        </header>
    );
}

export default HeaderHome;