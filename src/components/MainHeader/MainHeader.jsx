import React from 'react';
import { Link } from 'react-router-dom';
import style from './MainHeader.module.css';

const MainHeader = () => {
    return (
        <>
            <header className={style.AppHeader}>
                <div className={style.divTitle}>
                    <h1>Les lycées publics mayennais vous forment !</h1>
                </div>

                <div className='divButtonHeader'>
                    <Link to="/listeForma" className={style.secondButton}>Voir les formations</Link>
                    <Link to="/lycees" className={style.secondButton}>Voir les lycées</Link>
                </div>
            </header>
        </>
    );
};

export default MainHeader;
