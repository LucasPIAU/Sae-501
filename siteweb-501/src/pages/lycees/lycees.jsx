import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './lycees.module.css';
import ListCard from '../../components/listCard/listCard';
import Map from '../../components/map';
import { useNavigate } from 'react-router-dom';
import { selectEtablissements } from '../../store/formation/formationSelector.js';
import { setFilteredEtablissements } from '../../store/formation/formationSlice.js';
import FilterForm from '../../components/FilterForm/FilterForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
    const dispatch = useDispatch();
    const [filters, setFilters] = useState([]);
    const [city, setCity] = useState(null);
    const [range, setRange] = useState(50);
    const [userCoordinates, setUserCoordinates] = useState([0, 0]); // Coordonnées de l'utilisateur
    const navigate = useNavigate();
  
    // Exemple de fonction pour obtenir la position de l'utilisateur
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoordinates([position.coords.longitude, position.coords.latitude]);
        },
        (error) => console.error(error)
      );
    }, []);
  
    // Filtrage avec useMemo pour optimiser les calculs
    const filteredEtablissements = useMemo(() => {
        console.log(allEtablissements);
      let results = allEtablissements;

      console.log(city)
      console.log(filters)
  
      // Filtrer par nom de ville
      if (city && city !== "") {
        results = results.filter((est) =>
          est.name.toLowerCase().includes(city.toLowerCase())
        );
      }
  
      // Appliquer les filtres supplémentaires
      if (filters.length > 0) {
        const combineFilters = (filters) => (obj) =>
          filters.every((filter) => filter(obj));
        results = results.filter(combineFilters(filters));
      }
      console.log(results)
      return results;
    }, [allEtablissements, city, range, filters, userCoordinates]);
  
    const navigateTo = () => {
      navigate(-1);
    };
  
    return (
      <>
        <FilterForm
          onFilter={setFilters}
          onCityChange={setCity}
          onRangeChange={setRange}
          onSetType={() => {}}
          page={"etablissement"}    
        />
        <div className={style.containerLycee}>
          <button className={style.backButton} onClick={navigateTo}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className={style.containerMapFormation}>
            <div className={style.containerMap}>
              <Map />
            </div>
            <div className={style.containerListCard}>
              <ListCard items={filteredEtablissements}/>
            </div>
          </div>
        </div>
      </>
    );
  };
  

export default Lycees;
