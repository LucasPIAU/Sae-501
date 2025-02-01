import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEtablissements, selectFormations } from '../../store/formation/formationSelector.js';
import style from "./detail.module.css";
import Map from "../../components/Map/map.jsx";
import Title from '../../components/Title/Title';
import Description from '../../components/Description/Description';
import Image from '../../components/Image/Image';
import Hr from "../../components/Hr/Hr";
import Video from "../../components/Video/Video"
import ListCard from '../../components/listCard/listCard';
import bgCardImage from '../../assets/images/stmg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Detail() {
  const location = useLocation();
  const { itemId } = location.state || {};
  const [item, setItem] = useState(null);
  const [filtredEtablissement, setFiltredEtablissement] = useState(null);
  const [hoveredEtablissement, setHoveredEtablissement] = useState(null);

  const formations = useSelector(selectFormations);
  const etablissement = useSelector(selectEtablissements);

  useEffect(() => {
    setItem(formations?.find(formation => formation._id === itemId));

    if (item && item.etablissement) {
      setFiltredEtablissement(etablissement.filter(etab =>
        item.etablissement.includes(etab._id)
      ));
    }
  }, [itemId, formations, etablissement, item]);

  const getContent = (content) => {
    return content?.map((element, index) => {
      switch (element.type) {
        case "title":
          return <Title key={index} title={element.data} />;
        case "desc":
          return <Description key={index} description={element.data} />;
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

  return (
    <div className={style.detail}>
      {item ? (
        <>
          <Link to={-1} className={style.backButton}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <div className={style.containerDetail}>
            <div className={style.containerContentTitle}>
              <h1 className={style.titleDetail}>{item.name}</h1>
              <div className={style.containerContent}>
                {getContent(item.content)}
              </div>
            </div>
            {filtredEtablissement && 
              <div className={style.containerContent}>
                <Map dataEtablissement={filtredEtablissement} hoveredEtablissement={hoveredEtablissement} />
                <div className={style.containerListCard}>
                  <ListCard items={filtredEtablissement} onHover={setHoveredEtablissement}  mini={true}/>
                </div>
              </div>
            }
          </div>
        </>
      ) : (
        <p>Pas de data trouvée</p>
      )}
    </div>
  );
}

export default Detail;
