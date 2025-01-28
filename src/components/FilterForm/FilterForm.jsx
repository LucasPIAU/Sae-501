import React, { useEffect, useState } from 'react';
import style from './FilterForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setMotClef, setFilterCity, setFilterRange } from '../../store/formation/formationSlice';
import { selectCity, selectMotClef, selectRange } from '../../store/formation/formationSelector';

const FilterForm = ({ onFilter, type, onCityChange, onRangeChange, page }) => {
  const [motCle, setMotCle] = useState('');
  // const [type, setType] = useState('generale');
  const [city, setCity] = useState('');
  const [range, setRange] = useState(20);
  const dispatch = useDispatch();
  const storeMotClef = useSelector(selectMotClef);
  const storeCity = useSelector(selectCity);
  const storeRange = useSelector(selectRange);
  console.log(type)

  useEffect(()=>{
    console.log("storeCity : ", storeCity)
    if(storeMotClef && storeMotClef !== ""){
      setMotCle(storeMotClef);
    }
    if(storeCity && storeCity !== ""){
      setCity(storeCity);
    }
    if(storeRange){
      setRange(storeRange);
    }
  },[storeMotClef, storeCity, storeRange])

  const handleCityChange = (event) => {
    setCity(event.target.value);
    // onCityChange(event.target.value); // A rajouter pour emttre a jour la lsite a chaque changement
  };

  const handleRangeChange = (event) => {
    setRange(event.target.value);
    // onRangeChange(event.target.value); // A rajouter pour emttre a jour la lsite a chaque changement
  };

  const handleSubmit = (event) => { 
    event.preventDefault();
    const filters = [];
  
    if (motCle) {
      filters.push({ type: 'motClef', value: motCle.toLowerCase().trim() });
      console.log(motCle)
      dispatch(setMotClef(motCle));
    }
  
    if ((type === 'generale' || type === 'options' || type === 'techno') && page === 'formation') {
      filters.push({ type: 'generale', value: ['generale', 'option', 'techno'] });
    } else if (type === 'pro' && page === 'formation') {
      filters.push({ type: 'pro', value: 'Professionel' });
    } else {
      filters.push({ type: 'etablissement', value: 'etablissement' });
    }
  
    console.log("Filtres soumis :", filters); // Vérifie les filtres avant envoi
    onFilter(filters);
  
    if (page === "etablissement") {
      console.log("range : ", range);
      dispatch(setFilterRange(range));
      dispatch(setFilterCity(city));
      onCityChange(city);
      onRangeChange(range);
    }
  };
  
  

  const handleReset = () => {
    setMotCle('');
    setCity('');
    setRange(50);
    page === "etablissement" && onCityChange("")
    page === "etablissement" && onRangeChange(50)
    onFilter([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.filtreFiliere}>
        {page === "formation" &&
          <div className={style.containerFormationInput}>
            <input
              type="text"
              id="key"
              name="key"
              placeholder="Mots-clés"
              value={motCle}
              onChange={(e) => setMotCle(e.target.value)}
            />
          </div>
        }
        {page === "etablissement" &&
          <div className={style.containerEtablissementInput}>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Ville"
              value={city}
              onChange={handleCityChange}
            />
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
            <span>{range} km</span>
          </div>
        }
        <div>
          <button type="submit" className={style.submitButton}>Appliquer filtre</button>
          <button type="button" className={style.resetButton} onClick={handleReset}>Réinitialiser filtre</button>
        </div>
      </div>
    </form>
  );
};

export default FilterForm;
