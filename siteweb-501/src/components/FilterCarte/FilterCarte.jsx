import React, { useState, useEffect } from 'react';
import style from './FilterCarte.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectEtablissements } from '../../store/formation/formationSelector.js';
import { setFilteredEtablissements } from '../../store/formation/formationSlice.js';

const FilterCarte = () => {
  const [range, setRange] = useState(50);
  const [city, setCity] = useState('');
  const allEtablissements = useSelector(selectEtablissements);
  const dispatch = useDispatch();

  const handleRangeChange = (event) => {
    setRange(event.target.value);
  };

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
  };

  useEffect(() => {
    // Filtrer par nom partiellement correspondant
    const nameMatchingEstablishments = allEtablissements.filter(est =>
      est.nom.toLowerCase().includes(city.toLowerCase())
    );

    // console.log('Établissements correspondant critère name:', nameMatchingEstablishments);

    // Filtrer par distance (établissements dans le rayon spécifié)
    const distanceMatchingEstablishments = allEtablissements.filter(est => {
      if (!est.coordinates) return false;
      const distance = calculateDistance(allEtablissements[0].coordinates, est.coordinates);
      return distance <= range;
    });

    // console.log('Établissements correspondant critère localisation:', distanceMatchingEstablishments);

    // Trouver les éléments présents dans les deux listes
    const matchingEstablishments = nameMatchingEstablishments.filter(est =>
      distanceMatchingEstablishments.some(distEst => distEst.nom === est.nom)
    );

    // console.log('Établissements correspondant aux deux critères:', matchingEstablishments);

    dispatch(setFilteredEtablissements(matchingEstablishments));
  }, [city, range, allEtablissements, dispatch]);

  return (
    <div className={style.filtreCarte}>
      <input
        type="text"
        id="key"
        name="key"
        placeholder="Ville"
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
          disabled={!city.trim()} // Désactiver si le champ 'city' est vide
        />
        <span id="rangeValue">{range} km</span>
      </div>
    </div>
  );
};

export default FilterCarte;
