import React from 'react'
import Navbar from '../components/Nav';
import Body from '../components/BodyCatalogo';

import '../styles/CatalogoStyles.css';

const Catalogo = () => {
    return (
        <div className="container-catalogo">
            <Navbar />
            <Body />
        </div>
    )
}

export default Catalogo;