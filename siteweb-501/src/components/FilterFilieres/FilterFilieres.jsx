import React from 'react';
import style from './FilterFilieres.module.css'

const FilterFiliere = () => {
    return (
        <>
            <div className={style.filtreFiliere}>
                <input type="text" id="key" name="key" placeholder='Mots-clés'/>
                <fieldset>
                    <legend>Filière</legend>

                    <div className={style.oscour}>
                        <div>
                            <input type="radio" id="g&t" name="filiere" value="g&t" checked />
                            <label for="g&t">Général et Technologique</label>
                        </div>

                        <div>
                            <input type="radio" id="pro" name="filiere" value="pro" />
                            <label for="pro">Professionnelle</label>
                        </div>
                    </div>
                </fieldset>
            </div>
        </>
    )
}

export default FilterFiliere;