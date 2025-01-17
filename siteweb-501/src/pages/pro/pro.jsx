import React, { useState } from 'react';
import style from "./pro.module.css";
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFormations } from '../../store/formation/formationSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Pro() {
  const formations = useSelector(selectFormations);
  const navigate = useNavigate();

  const [selectedDomain, setSelectedDomain] = useState(null);

  console.log("formation : ", formations);

  // Liste des domaines (catégories)
  const domains = [
    ...new Set(
      formations
        .filter((formation) => formation.filiere === "Professionel")
        .map((formation) => formation.categorie)
    )
  ].map((category) => ({ name: category })); // Transforme en objets avec une clé `name`

  // Filtrer les formations affichées en fonction du domaine sélectionné
  const filteredFormations = selectedDomain
    ? formations.filter(
        (formation) =>
          formation.filiere === "Professionel" &&
          formation.categorie === selectedDomain
      )
    : formations.filter((formation) => formation.filiere === "Professionel");

  const navigateTo = () => {
    navigate(-1);
  };

  // Met à jour le domaine sélectionné
  const onDomainSelect = (domain) => {
    setSelectedDomain(domain.name); // Met à jour l'état
  };

  return (
    <>
      <div className={style.containerPro}>
        <button className={style.backButton} onClick={navigateTo}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className={style.containerMapFormation}>
          {/* Liste des domaines et formations dans la même ListCard */}
          <ListCard
            items={selectedDomain ? filteredFormations : domains} // Affiche soit les domaines, soit les formations filtrées
            onDomainSelect={onDomainSelect} // Permet de sélectionner un domaine
          />
        </div>
      </div>
    </>
  );
}

export default Pro;
