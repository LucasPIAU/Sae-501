import React, { useState, useEffect } from 'react';
import style from "./pro.module.css";
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';

function Techno() {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    fetch('/assets/json/data.json')
      .then(response => response.json())
      .then(data => {setFormations(data);console.log(data)});
  }, []);

  return (
    <>
    <div className={style.AppA}>
      {/* <button className={style.backButton} onClick={navigateTo}>Back</button> */}
      <div className={style.containerMapFormation}>
        {/* <div className={style.containerMap}>
        <Map />
        </div> */}
        <ListCard items={formations} type="pro"/>
      </div>
    </div>
    </>
  );
}

export default Techno;
