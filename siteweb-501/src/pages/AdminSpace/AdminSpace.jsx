import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { setFormations, moveContent } from '../../store/formation/formationSlice';
import { selectFormations } from '../../store/formation/formationSelector.js';
import style from "./AdminSpace.module.css";
import Map from "../../components/map";
import Title from '../../components/Title/Title';
import Description from '../../components/Description/Description';
import Image from '../../components/Image/Image';
import Hr from "../../components/Hr/Hr";
import Video from "../../components/Video/Video";
import ListCard from '../../components/listCard/listCard';
import bgCardImage from '../../assets/images/test.jpg';

function AdminSpace() {
  const location = useLocation();
  const { itemId } = location.state || {};  // Récupérer l'id depuis les paramètres de la route
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formations = useSelector(selectFormations);  // Récupérer toutes les formations depuis Redux
  const item = formations.find(formation => formation.id === itemId);  // Trouver la formation par son id

  console.log("Formation récupérée depuis le store : ", item);

  const navigateTo = () => {
    navigate(-1);
  };

  // Fonction pour réorganiser les éléments du contenu et mettre à jour l'ordre local
  const handleMoveContent = (fromIndex, toIndex) => {
    dispatch(moveContent({ formationId: item.id, indexFrom: fromIndex, indexTo: toIndex }));
  };

  const getContent = (content) => {
    if (!content || content.length === 0) return null;

    return content.map((element, index) => (
      <DraggableContent
        key={index}
        index={index}
        element={element}
        moveContent={handleMoveContent}
        item={item}
      />
    ));
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
                  <ListCard items={formations} type="etablissement" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Pas de data trouvée</p>
        )}
      </div>
    </DndProvider>
  );
}

const DraggableContent = ({ index, element, moveContent, item }) => {
  const [, ref] = useDrag({
    type: 'CONTENT',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'CONTENT',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveContent(draggedItem.index, index);
        draggedItem.index = index;  // Met à jour l'index du drag
      }
    },
  });

  const renderElement = () => {
    switch (element) {
      case "Title":
        return <Title title={item.nom} />;
      case "desc":
        return <Description description={item.niveau} />;
      case "images":
        return <div><Image src={bgCardImage} alt="Image description" /></div>;
      case "hr":
        return <Hr />;
      case "video":
        return <Video src={item.src} />;
      default:
        return null;
    }
  };

  return (
    <div ref={(node) => ref(drop(node))} className={style.draggableItem}>
      {renderElement()}
    </div>
  );
};

export default AdminSpace;
