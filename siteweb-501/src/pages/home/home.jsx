import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from "./home.module.css";
import Map from '../../components/map';
import ListCard from '../../components/listCard/listCard';
import { initializeData } from '../../store/formation/formationSlice';
import { selectFormations } from '../../store/formation/formationSelector.js';

function Home() {
  const [formationsV1, setFormationsV1] = useState([]);
  const dispatch = useDispatch();

  const formations = useSelector(selectFormations);

  useEffect(() => {
    if (formations.length === 0) {
      fetch('/assets/json/data.json')
        .then(response => response.json())
        .then((data) => {
          //console.log("Données chargées depuis le fichier : ", data);
  
          // Appeler l'action Redux `initializeData` pour trier et mettre à jour le store
          dispatch(initializeData(data));
        })
        .catch(error => {
          console.error("Erreur lors du chargement des données : ", error);
        });
    }
  }, [dispatch, formations]);
  

  // Récupération des données depuis data.json
  useEffect(() => {
    fetch('/assets/json/data.json')
      .then(response => response.json())
      .then(data => {setFormationsV1(data)}); // Sauvegarde les données récupérées
  }, []);

  //console.log(formationsV1)

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