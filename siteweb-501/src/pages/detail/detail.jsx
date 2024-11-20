import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectFormations } from '../../store/formation/formationSelector.js';
import style from "./detail.module.css";
import Map from "../../components/map"
import Title from '../../components/Title/Title';
import Description from '../../components/Description/Description';
import Image from '../../components/Image/Image';
import Hr from "../../components/Hr/Hr";
import Video from "../../components/Video/Video"
import ListCard from '../../components/listCard/listCard';
import bgCardImage from '../../assets/images/test.jpg';
import { setFormations } from '../../store/formation/formationSlice';

function Detail() {
  const location = useLocation();
  const { itemId } = location.state || {};  // Récupérer l'id depuis les paramètres de la route
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formations = useSelector(selectFormations);

  useEffect(() => {
    // Si les formations sont déjà présentes dans Redux, on ne fait rien
    if (formations.length === 0) {
      // Charger les données depuis le fichier JSON si elles ne sont pas déjà présentes dans Redux
      fetch('/assets/json/data.json')
        .then(response => response.json())
        .then((data) => {
          console.log("Données chargées depuis le fichier JSON : ", data);
          dispatch(setFormations(data));  // Mettre à jour le store Redux
        });
    }
  }, [dispatch, formations]);

  const item = formations?.find(formation => formation.id === itemId);  // Trouver la formation par son id
  console.log(itemId) 
  console.log(formations)
  console.log("Formation récupérée depuis le store : ", item);

  // Fonction pour rendre le contenu en fonction du type
  const getContent = (content) => {
    return content?.map((element, index) => {
      switch (element) {
        case "Title":
          return <Title key={index} title={item.nom} />;
        case "desc":
          return <Description key={index} description={item.niveau} />;
        case "images":
          return (
            <div key={index}>
              <Image src={bgCardImage} alt="Image description" />
            </div>
          );
        case "hr":
          return <Hr key={index} />;
        case "video":
          return <Video key={index} src={item.src} />;
        default:
          return null;
      }
    });
  };

  const navigateTo = () => {
    navigate(-1);
  };

  const navigateToAdmin = () => {
    navigate('/adminspace', { state: { itemId: item.id } }); // Passer seulement l'id ici
  };

  return (
    <div className={style.detail}>
      {item ? (
        <>
          <button className={style.backButton} onClick={navigateTo}>Back</button>
          <button className={style.backButton} onClick={navigateToAdmin}>Admin</button>
          <div className={style.containerDetail}>
            <div className={style.containerContentTitle}>
              <h1 className={style.titleDetail}>{item.nom}</h1>
              <div className={style.containerContent}>
                {getContent(item.content)}
              </div>
            </div>
            <div className={style.containerContent}>
              <Map />
              <div className={style.containerListCard}>
                <ListCard items={formations} type="etablissement" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Pas de data trouvée</p>
      )}
    </div>
  );
}

export default Detail;
