import React, { useState, useEffect, useMemo } from 'react';
import style from './FilterFilieres.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeData } from '../../store/formation/formationSlice.js';

const FilterFiliere = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Sélectionner les formations depuis le store Redux
    const formations = useSelector((state) => state.formations.formations);

    // États locaux pour les critères de recherche et de filtrage
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('g&t');

    // Charger les données dans Redux une seule fois si elles ne sont pas encore initialisées
    useEffect(() => {
        if (formations.length === 0) {
            fetch('/assets/json/data.json')
                .then(response => response.json())
                .then(data => {
                    // Initialise les données dans Redux
                    dispatch(initializeData(data));
                })
                .catch(error => console.error("Erreur lors du chargement des données :", error));
        }
    }, [formations, dispatch]);

    // Gestion du champ de recherche
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    // Gestion de la sélection de type
    const handleTypeChange = (event) => {
        const type = event.target.value;
        setSelectedType(type);
        if (type === 'pro') {
            navigate("/pro");
        } else {
            navigate("/");
        }
    };

    // Filtrage des formations en fonction des critères de recherche et de type sélectionné
    const filteredFilieres = useMemo(() => {
        return formations.filter(filiere => 
            filiere.nom.toLowerCase().includes(searchTerm) &&
            ((selectedType === 'g&t' && (filiere.type === 'generale' || filiere.type === 'techno')) || 
             (selectedType === 'pro' && filiere.type === 'pro'))
        );
    }, [formations, searchTerm, selectedType]);

    return (
        <>
            <div className={style.filtreFiliere}>
                <input
                    type="text"
                    id="key"
                    name="key"
                    placeholder='Mots-clés'
                    value={searchTerm}
                    onChange={handleSearch}
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
                                checked={selectedType === 'g&t'}
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
                                checked={selectedType === 'pro'}
                                onChange={handleTypeChange}
                            />
                            <label htmlFor="pro">Professionnelle</label>
                        </div>
                    </div>
                </fieldset>
            </div>

            {/* Affichage des résultats filtrés */}
            <div className={style.resultContainer}>
                {filteredFilieres.map(filiere => (
                    <div key={filiere.id} className={style.resultItem}>
                        {filiere.nom} - {filiere.type}
                    </div>
                ))}
            </div>
        </>
    );
}

export default FilterFiliere;
