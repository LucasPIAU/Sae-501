import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './lycees.module.css';
import ListCard from '../../components/listCard/listCard';
import Map from "../../components/Map/map.jsx";
import { useNavigate } from 'react-router-dom';
import { selectCity, selectEtablissements, selectRange } from '../../store/formation/formationSelector.js';
import FilterForm from '../../components/FilterForm/FilterForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import fetchCoordinates from '../../utils/fetchCoordinates'; // Import de la fonction
import { setFilterCity, setFilterRange } from '../../store/formation/formationSlice.js';

const calculateDistance = (coords1, coords2) => {
  const [lon1, lat1] = coords1;
  const [lon2, lat2] = coords2;
  const R = 6371; // Rayon de la Terre en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Lycees = () => {
  const allEtablissements = useSelector(selectEtablissements);
  const storeCity = useSelector(selectCity);
  const storeRange = useSelector(selectRange);
  const [filteredEtablissements, setFilteredEtablissements] = useState([]);
  const [city, setCity] = useState('');
  const [range, setRange] = useState(20);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const filterByLocation = async () => {
      console.log("city : ", city)
      if (city || storeCity) {
        const cityCoordinates = await fetchCoordinates(storeCity ? storeCity : city);
        if (!cityCoordinates) return;
        console.log("cityCoordinates : ", cityCoordinates);
        const results = allEtablissements.filter((etablissement) => {
          if (!etablissement.Longitude || !etablissement.Latitude) return false; // Ignorer si les coordonnées manquent
          const distance = calculateDistance(
            cityCoordinates,
            [etablissement.Longitude, etablissement.Latitude] // Longitude et Latitude dans cet ordre
          );    
          console.log("distance : ", distance)
          console.log("range : ", range)     
          return distance <= (storeRange ? storeRange : range); // Filtrer selon le rayon
        });
        console.log("result : ", results)
        setFilteredEtablissements(results);
        dispatch(setFilterCity(city))
        dispatch(setFilterRange(range))
      } else {
        setFilteredEtablissements(allEtablissements); // Si pas de ville, afficher tout
      }
    };

    filterByLocation();
  }, [city, range, allEtablissements]);

  const navigateTo = () => {
    navigate(-1);
  };

  return (
    <>
      <FilterForm
        onCityChange={setCity}
        onRangeChange={setRange}
        onFilter={() => {}}
        page="etablissement"
      />
      <div className={style.containerLycee}>
        <button className={style.backButton} onClick={navigateTo}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className={style.containerMapFormation}>
          <div className={style.containerMap}>
            <Map dataEtablissement={filteredEtablissements} />
          </div>
          <div className={style.containerListCard}>
            <ListCard items={filteredEtablissements} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Lycees;
