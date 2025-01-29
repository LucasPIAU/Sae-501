import React, { useState, useEffect } from 'react';
import style from "./techno.module.css";
import ListCard from '../../components/listCard/listCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFormations } from '../../store/formation/formationSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Techno() {
  const formations = useSelector(selectFormations);
  const updatedFormations = formations.filter(formation => formation.type === "techno");

  const [selectedDomain, setSelectedDomain] = useState(null);

  const domains = [
    ...new Set(
      formations
        .filter((formation) => formation.filiere === "techno")
        .map((formation) => formation.categorie)
    )
  ].map((category) => ({ name: category }));

  const filteredFormations = selectedDomain
    ? formations.filter(
        (formation) =>
          formation.filiere === "techno" &&
          formation.categorie === selectedDomain
      )
    : formations.filter((formation) => formation.filiere === "techno");

  const onDomainSelect = (domain) => {
    setSelectedDomain(domain.name); // Met à jour l'état
  };

  return (
    <>
      <div className={style.containerTechno}>
        <Link to={-1} className={style.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <div className={style.containerMapFormation}>
          <ListCard
            items={selectedDomain ? filteredFormations : updatedFormations} // Affiche soit les domaines, soit les formations filtrées
            onDomainSelect={onDomainSelect} // Permet de sélectionner un domaine
          />
        </div>
      </div>
    </>
  );
}

export default Techno;
