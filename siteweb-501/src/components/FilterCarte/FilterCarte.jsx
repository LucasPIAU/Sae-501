import React, { useState, useEffect } from 'react';
import style from './FilterCarte.module.css';
import { useDispatch } from 'react-redux';
import { setEtablissements } from '../../store/formation/formationSlice.js';

const FilterCarte = () => {
    const [range, setRange] = useState(50);
    const [city, setCity] = useState('');
    const [establishments, setEstablishments] = useState([]);
    const [filteredEstablishments, setFilteredEstablishments] = useState([]); 
    const dispatch = useDispatch();

    const handleRangeChange = (event) => {
        const newRange = event.target.value;
        setRange(newRange);
        document.getElementById('rangeValue').textContent = `${newRange} km`;
    };

    // Charger les établissements depuis le fichier JSON
    useEffect(() => {
        fetch('/assets/json/data.json')
            .then(response => response.json())
            .then(data => {
                setEstablishments(data);
                //console.log('Établissements chargés:', data);
            })
            .catch(error => console.error("Erreur lors du chargement des établissements:", error));
    }, []);

    // Fonction pour calculer la distance entre deux coordonnées
    const calculateDistance = (coords1, coords2) => {
        const [lon1, lat1] = coords1;
        const [lon2, lat2] = coords2;
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    // Filtrer les établissements en fonction de `city` et `range`
    useEffect(() => {
        //console.log('Ville saisie pour recherche partielle:', city);
        //console.log('Rayon sélectionné pour recherche:', range);

        // Filtrer par nom partiellement correspondant
        const nameMatchingEstablishments = establishments.filter(est => 
            est.nom.toLowerCase().includes(city.toLowerCase())
        );

        //console.log('Établissements correspondant au nom:', nameMatchingEstablishments);

        // Filtrer par distance (établissements dans le rayon spécifié)
        const distanceMatchingEstablishments = establishments.filter(est => {
            if (!est.coordinates) {
                //console.warn('Coordonnées manquantes pour:', est.nom);
                return false;
            }
            const distance = calculateDistance(establishments[0].coordinates, est.coordinates);
            return distance <= range;
        });

        //console.log('Établissements dans le rayon:', distanceMatchingEstablishments);

        // Fusionner les deux listes et supprimer les doublons
        const combinedEstablishments = [
            ...nameMatchingEstablishments,
            ...distanceMatchingEstablishments
        ];

        // Supprimer les doublons en utilisant un Set avec un identifiant unique
        const uniqueEstablishments = Array.from(
            new Set(combinedEstablishments.map(est => est.nom))
        ).map(name => combinedEstablishments.find(est => est.nom === name));

        // console.log('Établissements après fusion et suppression des doublons:', uniqueEstablishments);
        setFilteredEstablishments(uniqueEstablishments);
        dispatch(setEtablissements(uniqueEstablishments));
    }, [city, range, establishments]);

    return (
        <>
            <div className={style.filtreCarte}>
                <input
                    type="text"
                    id="key"
                    name="key"
                    placeholder='Ville'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <div>
                    <label htmlFor="range">Rayon de recherche (Km)</label>
                    <input
                        type="range"
                        id="range"
                        name="range"
                        min="0"
                        max="100"
                        value={range}
                        onChange={handleRangeChange}
                    />
                    <span id="rangeValue">{range} km</span>
                </div>
            </div>
        </>
    );
}

export default FilterCarte;
