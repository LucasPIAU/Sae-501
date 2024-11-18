import React from 'react';
import { useNavigate } from 'react-router-dom';

const FilterFiliere = () => {
    const navigate = useNavigate();

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        // Naviguer vers la bonne route en fonction de la valeur sélectionnée
        if (selectedValue === 'g&t') {
            navigate('/');
        } else if (selectedValue === 'pro') {
            navigate('/pro');
        }
    };

    return (
        <>
            <div className='filtre-filiere'>
                <input type="text" id="key" name="key" />
                <fieldset>
                    <legend>Filière</legend>
                    <div>
                        <input
                            type="radio"
                            id="g&t"
                            name="filiere"
                            value="g&t"
                            onChange={handleChange}
                            defaultChecked
                        />
                        <label htmlFor="g&t">Général et Technologique</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="pro"
                            name="filiere"
                            value="pro"
                            onChange={handleChange}
                        />
                        <label htmlFor="pro">Professionnelle</label>
                    </div>
                </fieldset>
            </div>
        </>
    );
};

export default FilterFiliere;
