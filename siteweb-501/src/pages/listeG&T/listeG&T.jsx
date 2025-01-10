import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from "./listeG&T.module.css";
import Map from '../../components/map';
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';
import { initializeData } from '../../store/formation/formationSlice';
import { selectFormations } from '../../store/formation/formationSelector.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import FilterForm from '../../components/FilterForm/FilterForm.jsx';

function ListeGT() {
  const formations = useSelector(selectFormations);
  console.log('formation : ', formations)
  const [filters, setFilters] = useState([]);
  const [type, setType] = useState(null);
  const filtredFormation = useMemo(() => {
    if (!filters.length) return formations; // Si aucun filtre, retourner toutes les formations
    const combineFilters = filters => obj => filters.every((filter) => filter(obj));
    return formations.filter(combineFilters(filters));
  }, [formations, filters]);


  const navigate = useNavigate();
  console.log('filtredFormation : ' + filtredFormation);
  const navigateTo = () => {
    navigate(-1);
  }

  const sectionItem = [
    {
      nom: "Options de seconde générale et technologique",
      link: "/optionGenerale"
    },
    {
      nom: "Première générale",
      link: "/spePremiere"
    },
    {
      nom: "Première technologique",
      link: "/filiereTechno"
    }
  ]

  const sectionItemPro = [
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

  const onFilter = (newFilters) => {
    setFilters(newFilters);
  }

  const onSetType = (newType) => {
    setType(newType);
  }

  console.log('newType : ' + type);
  console.log("filters : " + filters)

  return (
    <>
      <FilterForm onFilter={onFilter} onSetType={onSetType} page={"formation"}/>
      <div className={style.AppA}>
        <button className={style.backButton} onClick={navigateTo}><FontAwesomeIcon icon={faArrowLeft} /></button>
        <div className={style.containerMapFormation}>
          {!filters.length && type === "generale" ? (
            <ListCard items={sectionItem} />
          ) : !filters.length && type === "pro" ? (
            <ListCard items={sectionItemPro} />
          ) : (
            <ListCard items={filtredFormation} isInSearch={true} />
          )}
        </div>
      </div>
    </>
  );
}

export default ListeGT;