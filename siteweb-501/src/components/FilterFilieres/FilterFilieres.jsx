import React, { useState, useEffect } from 'react';
import style from './FilterFilieres.module.css'
import { Navigate, useNavigate } from 'react-router-dom';

const FilterFiliere = () => {
    const navigate = useNavigate();
    const [filieres, setFlieres] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 
    const [selectedType, setSelectedType] = useState('g&t');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
        if(event.target.value == 'pro'){
            navigate("/pro")
        }else{
            navigate("/")
        }
    };

    const filteredFilieres = filieres.filter(filiere => 
        filiere.nom.toLowerCase().includes(searchTerm) &&((selectedType === 'g&t' && (filiere.type === 'generale' || filiere.type === 'techno')) || (selectedType === 'pro' && filiere.type === 'pro'))
    );
    // Les résultats de la recherche par filtres (mot clé et bouton radio) sont dans la variable filteredFilieres

    useEffect(() => {
        fetch('/assets/json/data.json')
          .then(response => response.json())
          .then(data => {setFlieres(data)});
    }, []);

    return (
        <>
            <div className={style.filtreFiliere}>
                <input type="text" id="key" name="key" placeholder='Mots-clés' value={searchTerm} onChange={handleSearch}/>
                <fieldset>
                    <legend>Filière</legend>

                    <div className={style.oscour}>
                        <div>
                            <input type="radio" id="g&t" name="filiere" value="g&t" checked={selectedType === 'g&t'} onChange={handleTypeChange} />
                            <label for="g&t">Général et Technologique</label>
                        </div>

                        <div>
                            <input type="radio" id="pro" name="filiere" value="pro" checked={selectedType === 'pro'} onChange={handleTypeChange} />
                            <label for="pro">Professionnelle</label>
                        </div>
                    </div>
                </fieldset>
            </div>
        </>
    )
}

export default FilterFiliere;