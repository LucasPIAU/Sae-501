import React, { useState, useEffect } from 'react';
import style from "./pro.module.css"; // Assumes you have styles specific to this component
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';

function Techno() {
  const [formations, setFormations] = useState([]);
  const navigate = useNavigate();

  // Fetch and filter formations for "techno" type
  useEffect(() => {
    fetch('/assets/json/data.json')
      .then(response => response.json())
      .then(data => {
        // Filter formations of type "techno"
        const technoFormations = data.filter(f => f.type === 'pro');
        setFormations(technoFormations);
      });
  }, []);

  // Navigate to a previous page or home
  const handleBackClick = () => {
    navigate(-1); // Goes back to the previous page
  };

  return (
    <div className={style.AppA}>
      <button className={style.backButton} onClick={handleBackClick}>Back</button>
      <div className={style.containerMapFormation}>
        {/* Conditionally render the ListCard with only techno-type formations */}
        <ListCard items={formations} type="pro"/>
      </div>
    </div>
  );
}

export default Techno;
