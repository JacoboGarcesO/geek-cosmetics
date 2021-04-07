import React from 'react';
import { Link } from 'react-router-dom';

export const Nav= () => {
    return (
        <nav>
            <Link to="/" className="p-icon"><i style={{ fontSize: '28px' }} className="icono fas fa-house-user"></i></Link>
        </nav>
    )
}

export default Nav;