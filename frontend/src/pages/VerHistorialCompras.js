import React from 'react';
import Navbar from '../components/Nav';
import '../styles/HistorialStyles.css';
import HostorialCompras from '../components/HostorialCompras';

const VerHistorialCompras = () => {
    return (
        <div>
            <Navbar />
            <HostorialCompras/>
        </div>
    )
}

export default VerHistorialCompras;
