import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './MainHeader.module.css'

const MainHeader = () => {
    const navigate = useNavigate();

    const navigateTo = (href) => {
        navigate(href);
    }

    return (
        <>
            <header className={style.AppHeader}>
                <div className={style.divTitle}>
                    <h1>Les lycées publics mayennais vous forment !</h1>
                </div>

                {/* <div className={style.mainButton}>Trouve ta formation grâce au chatbot</div> */}
                <div className='divButtonHeader'>
                    <div className={style.secondButton} onClick={() => navigateTo('/listeForma')}>Voir les formations</div>
                    <div className={style.secondButton} onClick={() => navigateTo('/lycees')}>Voir les lycées</div>
                </div>
            </header>
        </>
    );
};

export default MainHeader;
