import React from 'react';
import { Link } from 'react-router-dom';
import style from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={style.navbar}>
            <Link to="/listeForma" className={style.navItem}>Voir les formations</Link>
            <Link to="/lycees" className={style.navItem}>Voir les lycées</Link>
        </nav>
    );
};

export default Navbar;