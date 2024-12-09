import React, { useState, useEffect } from 'react';
import style from "./listePro.module.css";
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FiltrageFilieres from '../../components/FilterFilieres/FilterFilieres.jsx';
import { selectFormations } from '../../store/formation/formationSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { selectFilteredFormations } from '../../store/formation/formationSelector';

function ListePro() {
  const [selectedCategorie, setSelectedCategorie] = useState(null); 
  const formations = useSelector((state) => state.formations.items); 
  console.log("formations page pro : ", formations);

  const navigate = useNavigate();

  const navigateTo = () => {
      navigate(-1);
  }

  const handleItemClick = (categorie) => {
    setSelectedCategorie(categorie);
  };

  const sectionItem = [
    {
      nom: "Transport et logistique",
      categorie: "transportLogistique"
    },
    {
      nom: "Numérique et métiers de l'électricité",
      categorie: "numeriqueElectricite"
    },
    {
        nom: "Alimentation hôterllerie restauration",
        categorie: "alimentationHotellerie"
      },
      {
        nom: "Maintenance et réparation : Industrie et véhicule",
        categorie: "industrieVehicule"
      },
      {
        nom: "Commerce vente gestion administration",
        categorie: "commerceAdministration"
      },
      {
        nom: "Communication visuelle et imprimerie",
        categorie: "communicationImprimerie"
      },
      {
        nom: "Santé sociale",
        categorie: "sante"
      },
      {
        nom: "Conception et production industielles",
        categorie: "conceptionProduction"
      },
      {
        nom: "Batiement travaux publics",
        categorie: "batimentTravauxPublics"
      },
      {
        nom: "Agriculture",
        categorie: "agriculture"
      }
    ]

    return (
        <>
            <FiltrageFilieres />
            <div className={style.containerPro}>
            <button className={style.backButton} onClick={navigateTo}><FontAwesomeIcon icon={faArrowLeft}/></button>
            <div className={style.containerMapFormation}>
                {/* Conditionally render the ListCard with only techno-type formations */}
                <ListCard 
                items={sectionItem}
                onCategorySelect={setSelectedCategorie} 
                selectedCategorie={selectedCategorie} />
            </div>
            </div>
        </>
    );
}

export default ListePro;