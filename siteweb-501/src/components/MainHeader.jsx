import React from 'react';

const MainHeader = () => {
    return (
        <>
            <header className='App-header'>
                <div className='divTitle'>
                    <h1>LES LYCEES PUBLICS MAYENNAIS VOUS FORMENT !</h1>
                </div>

                <a className='mainButton customButton' href=''>Trouve ta formation grâce au chatbot</a>
                <div className='divButtonHeader'>
                    <a className='secondButton customButton' href='/formations'>Voir les formations</a>
                    <a className='secondButton customButton' href='/stages'>Voir les lycées
                    </a>
                </div>
            </header>
        </>
    );
};

export default MainHeader;
