import React, { useState, useEffect } from 'react';
import style from './FilterFilieres.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectFormations } from '../../store/formation/formationSelector.js';
import { setFilteredFormations} from '../../store/formation/formationSlice.js'

const FilterFiliere = () => {
    const [type, setType] = useState('');
    const [motCle, setMotCle] = useState('');
    const allFormations = useSelector(selectFormations);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Gestion de la sélection de type
    const handleTypeChange = (event) => {
        const type = event.target.value;
        setType(type);
        if (type === 'pro') {
            navigate("/listePro");
        } else {
            navigate("/listeg&t");
        }
    };

    useEffect(() => {
        //Filtrer par mot clé
        const nameMatchingFormations = allFormations.filter(formations => 
            formations.nom.toLowerCase().includes(motCle.toLowerCase())
        );

        console.log('Formations correspondant critere mot clé:', nameMatchingFormations);

        //Filtrer par type
        const typeMatchingFormations = allFormations.filter(formations => {
            if (type === 'pro' && formations.type === 'pro') {
                return true;
            } else if (type === 'g&t' && (formations.type === 'generale' || formations.type === 'techno')) {
                return true;
            } else {
                return false;
            }
        });

        console.log('Formations correspondant aux type:', typeMatchingFormations);

        // Trouver les éléments présents dans les deux listes
        const matchingFormations = nameMatchingFormations.filter(formation =>
            typeMatchingFormations.some(typeFormation => typeFormation.nom === formation.nom)
        );

        console.log('Formations correspondant aux deux critères:', matchingFormations);

        dispatch(setFilteredFormations(matchingFormations));
    }, [type, motCle, allFormations, dispatch]);

    return (
        <>
            <div className={style.filtreFiliere}>
                <input
                    type="text"
                    id="key"
                    name="key"
                    placeholder='Mots-clés'
                    value={motCle}
                    onChange={(e) => setMotCle(e.target.value)}
                />
                <fieldset>
                    <legend>Filière</legend>

                    <div className={style.oscour}>
                        <div>
                            <input
                                type="radio"
                                id="g&t"
                                name="filiere"
                                value="g&t"
                                checked={type === 'g&t'}
                                onChange={handleTypeChange}
                            />
                            <label htmlFor="g&t">Général et Technologique</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                id="pro"
                                name="filiere"
                                value="pro"
                                checked={type === 'pro'}
                                onChange={handleTypeChange}
                            />
                            <label htmlFor="pro">Professionnelle</label>
                        </div>
                    </div>
                </fieldset>
            </div>
        </>
    );
}

export default FilterFiliere;
