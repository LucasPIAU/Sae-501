import React from 'react';
import { useNavigate } from 'react-router-dom';
const MainHeader = () => {
    const navigate = useNavigate();
    const navigateTo = (href) => {
        navigate(href);
    }

    return (
        <>
            <header className='App-header'>
                <div className='divTitle'>
                    <h1>LES LYCEES PUBLICS MAYENNAIS VOUS FORMENT !</h1>
                </div>
            <div className='mainButton customButton'>Trouve ta formation grâce au chatbot</div>
                <div className='divButtonHeader'>
                    <div className='secondButton customButton' onClick={() => navigateTo('/')}>Voir les formations</div>
                    <div className='secondButton customButton' onClick={() => navigateTo('/pro')}>Voir les lycées</div>
                </div>
            </header>
        </>
    );
};

export default MainHeader;