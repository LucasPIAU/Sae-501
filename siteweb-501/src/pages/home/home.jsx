import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from "./home.module.css";
import Map from '../../components/map';
import ListCard from '../../components/listCard/listCard';
import { initializeData } from '../../store/formation/formationSlice';
import { selectFormations } from '../../store/formation/formationSelector.js';
import { selectFilteredFormations } from '../../store/formation/formationSelector';

function Home() {
  const formations = useSelector(selectFilteredFormations);
  console.log('oscour', formations)

  var recherche = false;

  if (formations.length === 14) {
    recherche = true;
  }

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
          {/* <ListCard items={formations} type="formation" /> */}
          {recherche ? (
            <ListCard items={sectionItem} />
          ) : (
            <>
              <ListCard items={formations} type="techno" />
              <ListCard items={formations} type="options" />
              <ListCard items={formations} type="generale" />
            </>
          )}
          {/* <ListCard items={sectionItem} /> */}
        </div>
      </div>
    </>
    
  );
}

export default Home;