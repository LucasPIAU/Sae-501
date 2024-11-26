import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { moveContent, editContent, deleteContent } from '../../store/formation/formationSlice';
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
  const { itemId } = location.state || {}; // Récupérer l'id depuis les paramètres de la route
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formations = useSelector(selectFormations); // Récupérer toutes les formations depuis Redux
  const item = formations.find(formation => formation.id === itemId); // Trouver la formation par son id

  const [editingElement, setEditingElement] = useState(null); // Gérer l'élément en cours d'édition
  const [editValue, setEditValue] = useState(''); // Valeur temporaire d'édition

  const navigateTo = () => {
    navigate(-1);
  };

  const handleMoveContent = (fromIndex, toIndex) => {
    dispatch(moveContent({ formationId: item.id, indexFrom: fromIndex, indexTo: toIndex }));
  };

  const handleEdit = (index, element) => {
    setEditingElement({ index, element });
    setEditValue(element); // Pré-remplir avec les données actuelles
  };

  const handleEditSave = () => {
    if (editingElement) {
      dispatch(editContent({ 
        formationId: item.id, 
        index: editingElement.index, 
        newValue: editValue 
      }));
      setEditingElement(null); // Fermer l'interface d'édition
      setEditValue('');
    }
  };

  const handleDelete = (index) => {
    dispatch(deleteContent({ formationId: item.id, index }));
  };

  const getContent = (content) => {
    if (!content || content.length === 0) return null;

    return content.map((element, index) => (
      <div key={index} className={style.contentItem}>
        <button onClick={() => handleEdit(index, element)}>Edit</button>
        <button onClick={() => handleDelete(index)}>Delete</button>
        <DraggableContent
          index={index}
          element={element}
          moveContent={handleMoveContent}
          item={item}
        />
      </div>
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
            {editingElement && (
              <>
                {/* Overlay sombre */}
                <div className={style.modalOverlay} onClick={() => setEditingElement(null)}></div>
                <div className={style.editModal}>
                  <h3>Modifier l'Élément</h3>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <div>
                    <button onClick={handleEditSave}>Sauvegarder</button>
                    <button onClick={() => setEditingElement(null)}>Annuler</button>
                  </div>
                </div>
              </>
            )}
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
        draggedItem.index = index; // Met à jour l'index du drag
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
