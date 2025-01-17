import React, { useState, useEffect } from 'react';
import style from "./spePremiere.module.css";
import Map from '../../components/map';
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEtablissements, selectFormations } from '../../store/formation/formationSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function SpePremiere() {
  const navigate = useNavigate();

  const formations = useSelector(selectFormations);
  const etablissements = useSelector(selectEtablissements);
  const [selectFormation, setSelectFormation] = useState([]);  // Liste des formations sélectionnées
  const [filtredEtablissement, setFiltredEtablissement] = useState([]);  // Liste des établissements

  console.log(formations);

  // Filtrer les formations "générales"
  const updatedFormations = formations.filter(formation => formation.filiere === "generale");



  useEffect(()=>{
    setFiltredEtablissement(etablissements)
  },[etablissements])

  console.log(updatedFormations);
  console.log("filtredEtablissement : ", filtredEtablissement);

  const navigateTo = () => {
    navigate(-1);
  }

  const onSpeSelect = (newFormation) => {
    // Vérifier si la formation est déjà dans le tableau des formations sélectionnées
    const formationIndex = selectFormation.findIndex(f => f._id === newFormation._id);
    
    let updatedFormations;
    
    if (formationIndex === -1) {
      // Si la formation n'est pas déjà sélectionnée, on l'ajoute
      updatedFormations = [...selectFormation, newFormation];
    } else {
      // Si elle est déjà sélectionnée, on la retire
      updatedFormations = selectFormation.filter(f => f._id !== newFormation._id);
    }

    // Mettre à jour le tableau des formations sélectionnées
    setSelectFormation(updatedFormations);

    console.log("Formations sélectionnées :", updatedFormations);

    // Filtrer les établissements en fonction des formations sélectionnées


    const filteredEtablissements = etablissements.filter(etablissement =>
      updatedFormations.some(formation =>
        formation.etablissement.includes(etablissement.name)
      )
    );

    console.log("Établissements filtrés :", filteredEtablissements);
    console.log("lenght du log juste avant : ", filteredEtablissements.length)
    console.log("etablissements : ", etablissements);
    console.log("condition : ", filteredEtablissements.length == 0 ? etablissements : filteredEtablissements)

    setFiltredEtablissement(filteredEtablissements.length == 0 ? etablissements : filteredEtablissements);

    // setFiltredEtablissement(filteredEtablissements);
  };

  console.log("filtredEtablissement : ", filtredEtablissement)
  console.log("etablissements : ", etablissements)

  return (
    <>
      <div className={style.containerSpe}>
        <button className={style.backButton} onClick={navigateTo}><FontAwesomeIcon icon={faArrowLeft} /></button>
        <div className={style.containerMapFormation}>
          <div className={style.containerMap}>
            <Map dataEtablissement={filtredEtablissement}/>
          </div>
          <div className={style.containerListCard}>
            <ListCard items={updatedFormations} onSpeSelect={onSpeSelect}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpePremiere;
