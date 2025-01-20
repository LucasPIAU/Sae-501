import React, { useState } from 'react';
import style from './FilterForm.module.css';

const FilterForm = ({ onFilter, type, onCityChange, onRangeChange, page }) => {
  const [motCle, setMotCle] = useState('');
  // const [type, setType] = useState('generale');
  const [city, setCity] = useState('');
  const [range, setRange] = useState(20);

  const handleCityChange = (event) => {
    setCity(event.target.value);
    // onCityChange(event.target.value); // A rajouter pour emttre a jour la lsite a chaque changement
  };

  const handleRangeChange = (event) => {
    setRange(event.target.value);
    // onRangeChange(event.target.value); // A rajouter pour emttre a jour la lsite a chaque changement
  };

  const handleSubmit = (event) => {

    // console.log('page : ' + page)

    event.preventDefault(); 
    const filters = [];

    if (motCle) {
      filters.push((obj) => obj.name.toLowerCase().includes(motCle.toLowerCase().trim()));
    }

    if ((type === 'generale' || type === 'options' || type === 'techno') && page === 'formation') {
      filters.push((obj) => ['generale', 'option', 'techno'].includes(obj.filiere));
    } else if (type === 'pro' && page === 'formation') {
      filters.push((obj) => obj.filiere === 'Professionel');
    } else {
      filters.push((obj) => obj.filiere === 'etablissement');
    }
    // console.log('type : ' + type)
    // console.log('filter : ' + filters)
    onFilter(filters);
    page === "etablissement" && onCityChange(city)
    page === "etablissement" && onRangeChange(range)
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
