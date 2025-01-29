  import React, { useState, useEffect } from 'react';
  import { useLocation, useNavigate } from 'react-router-dom';
  import { useSelector, useDispatch } from 'react-redux';
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
  // import { setFormations } from '../../store/formation/formationSlice';

  function Detail() {
    const location = useLocation();
    const { itemId } = location.state || {};  // Récupérer l'id depuis les paramètres de la route
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [filtredEtablissement, setFiltredEtablissement] = useState(null);

    
    const formations = useSelector(selectFormations);
    const etablissement = useSelector(selectEtablissements);
    // console.log("itemId : ", itemId);

    useEffect(()=>{
      setItem(formations?.find(formation => formation._id === itemId)) // Trouver la formation par son id
      console.log("etablissement: ", etablissement)
      console.log("itemId: ", itemId);
      // console.log("formations : ", formations);
      console.log("item : ", item)
      if(item && item.etablissement ){
        // console.log("je passe dans item")
      setFiltredEtablissement(etablissement.filter(etab => 
        item.etablissement.includes(etab._id)
      ))
    }
    console.log("filtredEtablissement : ", filtredEtablissement);
    }, [itemId, formations, etablissement, item])

    console.log("item detail : ", item);
    // Fonction pour rendre le contenu en fonction du type
    const getContent = (content) => {
      // console.log("content : ", content)
      return content?.map((element, index) => {
        // console.log("element : ", element)
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

    const navigateTo = () => {
      navigate(-1);
    };

    const navigateToAdmin = () => {
      navigate('/adminspace', { state: { itemId: item._id } }); // Passer seulement l'id ici
    };

    return (
      <div className={style.detail}>
        {item ? (
          <>
          <button className={style.backButton} onClick={navigateTo}><FontAwesomeIcon icon={faArrowLeft}/></button>
          {/* <button className={style.backButton} onClick={navigateToAdmin}>Admin</button> */}
            <div className={style.containerDetail}>
              <div className={style.containerContentTitle}>
                <h1 className={style.titleDetail}>{item.name}</h1>
                <div className={style.containerContent}>
                  {getContent(item.content)}
                </div>
              </div>
              {filtredEtablissement && 
              <div className={style.containerContent}>
                <Map dataEtablissement={filtredEtablissement}/>
                <div className={style.containerListCard}>
                  <ListCard items={filtredEtablissement} />
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
