import React from 'react';
import style from './FilterCarte.module.css'

const FilterCarte = () => {
    const handleRangeChange = (event) => {
        const rangeIndicator = document.getElementById('rangeValue');
        rangeIndicator.textContent = `${event.target.value} km`;
    };

    return (
        <>
            <div className={style.filtreCarte}>
                <input type="text" id="key" name="key" placeholder='Ville'/>
                <div>
                    <label for="range">Rayon de recherche (Km)</label>
                    <input type="range" id="range" name="range" min="0" max="100" onChange={handleRangeChange}/>
                    <span id="rangeValue">50 km</span>
                </div>
            </div>
        </>
    )
}

export default FilterCarte;