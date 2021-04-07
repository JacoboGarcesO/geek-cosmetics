import React, { useEffect, useState } from 'react';
import IMG from '../images/cosmetic.svg';
import { Link } from 'react-router-dom';
import axios from '../axios/axios';

export const BodyCatalogo = () => {
    const [articulos, setArticulos] = useState([]);

    const getArticles = () => {
        axios.get('/articulos')
            .then(res => {
                setArticulos(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getArticles();
    }, [])

    return (
        <div className="container">
            {articulos.map(item => (
                    <div className="card" key={item.id}>
                        <div className="imgBx">
                            <img src={IMG} alt="icon-card" />
                        </div>
                        <div className="contentBx">
                            <h2>{item.descripcion}</h2>
                            <br/>
                            <p>{item.precio} $</p>
                            <br/>
                            <p>{item.cantidad} U</p>
                            <br/>
                            <Link to="/comprar"><span>Comprar</span></Link>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default BodyCatalogo;