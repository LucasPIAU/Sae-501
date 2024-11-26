import React, { useState, useEffect } from 'react';
import style from "./techno.module.css";
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';

function Techno() {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    fetch('/assets/json/data.json')
      .then(response => response.json())
      .then(data => {setFormations(data)});
  }, []);

  const navigate = useNavigate();

  const navigateTo = () => {
      navigate(-1);
  }

  //console.log(formations)

  return (
    <>
      <div className={style.AppA}>
        <button className={style.backButton} onClick={navigateTo}>Back</button>
        <div className={style.containerMapFormation}>
          {/* <div className={style.containerMap}>
          <Map />
          </div> */}
          <ListCard items={formations} type="techno"/>
        </div>
      </div>
    </>
    
  );
}

export default Techno;
