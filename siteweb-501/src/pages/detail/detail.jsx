import React, { useState, useEffect } from 'react';
import style from "./detail.module.css";
import { useLocation, useNavigate } from 'react-router-dom';
import Map from "../../components/map"
import Title from '../../components/Title/Title';
import Description from '../../components/Description/Description';
import Image from '../../components/Image/Image';
import Hr from "../../components/Hr/Hr";
import Video from "../../components/Video/Video"
import ListCard from '../../components/listCard/listCard';

import bgCardImage from '../../assets/images/test.jpg';

function Detail() {
  const location = useLocation();
  const { item } = location.state || {};
  const navigate = useNavigate();

  const [formations, setFormations] = useState([]);
  useEffect(() => {
    fetch('/assets/json/data.json')
      .then(response => response.json())
      .then(data => {setFormations(data);console.log(data)}); // Sauvegarde les données récupérées
  }, []);

  // Fonction pour rendre le contenu en fonction du type
  const getContent = (content) => {
    return content.map((element, index) => {
      switch (element) {
        case "Title":
          return <Title key={index} title={item.nom}></Title>;
        case "desc":
          return <Description key={index} description={item.niveau}></Description>;
        case "images":
          return <div key={index}>
            <Image src={bgCardImage} alt="Image description" />
                </div>;
        case "hr":
          return <Hr key={index} />;  
        case "video":
          return <Video src={item.src}> </Video>
        default:
          return null;
      }
    });
  };

  
  const navigateTo = () => {
    navigate(-1);
}

  return (
    <div className={style.detail}>
      {item ? (
        <>
        <button className={style.backButton} onClick={navigateTo}>Back</button>
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
          <ListCard items={formations} type="etablissement"/>
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
