import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from "./home.module.css";
import Map from '../../components/map';
import ListCard from '../../components/listCard/listCard';
import { initializeData } from '../../store/formation/formationSlice';
import { selectFormations } from '../../store/formation/formationSelector.js';

function Home() {

  const sectionItem = [
    {
      nom: "seconde générale et technologique",
      link: "optionGenerale"
    },
    {
      nom:"Première générale",
      link: "spePremiere"
    },
    {
      nom: "Première technologique",
      link: "filiereTechno"
    }
  ]

  return (
    <>
      <div className={style.AppA}>
        <div className={style.containerMapFormation}>
          {/* <Map /> */}
          {/* <ListCard items={formations} type="formation" /> */}
          <ListCard items={sectionItem} />
        </div>
      </div>
    </>
    
  );
}

export default Home;