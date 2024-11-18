import React from 'react';

const FilterFiliere = () => {
    return (
        <>
            <div className='filtre-filiere'>
                <input type="text" id="key" name="key"/>
                <fieldset>
                    <legend>Filière</legend>

                    <div>
                        <input type="radio" id="g&t" name="filiere" value="g&t" checked />
                        <label for="g&t">Général et Technologique</label>
                    </div>

                    <div>
                        <input type="radio" id="pro" name="filiere" value="pro" />
                        <label for="pro">Professionnelle</label>
                    </div>
                </fieldset>
            </div>
        </>
    )
}

export default FilterFiliere;