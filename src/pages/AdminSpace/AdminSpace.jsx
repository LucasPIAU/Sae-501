import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { moveContent } from '../../store/formation/formationSlice';
import { editContent, addContent, deleteContent, saveContentOrder } from '../../store/formation/formationAsyncAction.js';
import { selectEtablissements, selectFormations } from '../../store/formation/formationSelector.js';
import style from "./AdminSpace.module.css";
import Map from "../../components/Map/map.jsx";
import Title from '../../components/Title/Title';
import Description from '../../components/Description/Description';
import Image from '../../components/Image/Image';
import Hr from "../../components/Hr/Hr";
import Video from "../../components/Video/Video";
import ListCard from '../../components/listCard/listCard';
// import bgCardImage from '../../assets/images/stmg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function AdminSpace() {

    const [showPopup, setShowPopup] = useState(false);
    const allEtablissements = useSelector(selectEtablissements);
    const location = useLocation();
    const { itemId } = location.state || {}; // Récupérer l'id depuis les paramètres de la route
    const dispatch = useDispatch();

    const formations = useSelector(selectFormations); // Récupérer toutes les formations depuis Redux
    const item = formations.find(formation => formation._id === itemId); // Trouver la formation par son id

    const [editingElement, setEditingElement] = useState(null); // Gérer l'élément en cours d'édition
    const [editValue, setEditValue] = useState(''); // Valeur temporaire d'édition
    const [selectedValue, setSelectedValue] = useState('');
    const [inputValue, setInputValue] = useState(''); // Valeur pour le contenu texte
    const [mediaFile, setMediaFile] = useState(null); // Fichier pour les médias
    const [hasChanges, setHasChanges] = useState(false); // Pour détecter les modifications
    const [filtredEtablissement, setFiltredEtablissement] = useState(null);

        useEffect(()=>{
          console.log("itemId: ", itemId);
          // console.log("formations : ", formations);
          console.log("item : ", item)
          if(item && item.etablissement ){
            // console.log("je passe dans item")
          setFiltredEtablissement(allEtablissements.filter(etab => 
            item.etablissement.includes(etab._id)
          ))
        }
        console.log("filtredEtablissement : ", filtredEtablissement);
        }, [itemId, formations, allEtablissements, item])

    const handleMoveContent = (fromIndex, toIndex) => {
        dispatch(moveContent({ formationId: item._id, indexFrom: fromIndex, indexTo: toIndex }));
        setHasChanges(true); // Active le bouton "Sauvegarder"
    };

    const handleSaveChanges = () => {
        dispatch(saveContentOrder({ formationId: item._id, content: item.content }))
            .then(() => {
                setHasChanges(false); // Désactive le bouton après la sauvegarde
            })
            .catch((error) => {
                console.error("Erreur lors de la sauvegarde :", error);
            });
    };

    const handleEdit = (index, element) => {
        console.log(element)
        setEditingElement({ index, element });
        setEditValue(element.data); // Pré-remplir avec les données actuelles
    };

    const handleEditSave = () => {
        if (editingElement) {
            console.log(editingElement)
            let newValue = editValue;
            if (editingElement.element.type === "images" || editingElement.element.type === "video") {
                newValue = mediaFile; // Utiliser le fichier sélectionné
            }
            dispatch(editContent({
                formationId: item._id,
                index: editingElement.index,
                newValue: newValue,
                formationType: editingElement.type // Ajoute le type de formation
            }));
            setEditingElement(null); // Fermer l'interface d'édition
            setEditValue('');
        }
    };

    const handleDelete = (index) => {
        // Crée une nouvelle version du tableau sans l'élément à l'index spécifié
        const newContent = item.content.filter((_, i) => i !== index);
    
        // Ensuite, tu mets à jour le tableau content avec cette nouvelle version
        dispatch(saveContentOrder({ formationId: item._id, content: newContent }));
    };
    

    const handleAddElement = () => {
        if (selectedValue) {
            let newElement = { type: selectedValue };

            console.log("selectedValue : ", selectedValue);
            console.log("newElement : ", newElement);

            if (selectedValue === 'title' || selectedValue === 'desc') {
                newElement.data = inputValue;
            } else if (selectedValue === 'images' || selectedValue === 'video') {
                newElement.data = mediaFile;
            }

            console.log("newElement : ", newElement);

            dispatch(addContent({
                formationId: item._id,
                newElement
            }));
            setShowPopup(false); // Ferme la popup
            setSelectedValue(''); // Réinitialise le select
            setInputValue(''); // Réinitialise le champ texte
            setMediaFile(null); // Réinitialise le fichier média
        }
    };

    const getContent = (content) => {
        console.log(content);
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
                        <Link to={-1} className={style.backButton}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Link>
                        {hasChanges && <button className={style.saveChange} onClick={handleSaveChanges}>Sauvegarder</button>}
                        <div className={style.containerDetail}>
                            <div className={style.containerContentTitle}>
                                <h1 className={style.titleDetail}>{item.name}</h1>
                                <div className={style.containerContent}>
                                    {getContent(item.content)}
                                    <button onClick={() => setShowPopup(true)}>PLUS</button>
                                </div>
                            </div>
                            {filtredEtablissement && 
                            <div className={style.containerContent}>
                                <Map dataEtablissement={filtredEtablissement} />
                                <div className={style.containerListCard}>
                                    <ListCard items={filtredEtablissement} type="etablissement" />
                                </div>
                            </div>
                            }
                        </div>
                        {editingElement && (
                            <>
                                {/* Overlay sombre */}
                                <div className={style.modalOverlay} onClick={() => setEditingElement(null)}></div>
                                <div className={style.editModal}>
                                    <h3>Modifier l'Élément</h3>
                                    {editingElement.element.type === 'desc' ? (
                                        <textarea
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                        />
                                    ) : editingElement.element.type === 'images' || editingElement.element.type === 'video' ? (
                                        <input
                                            type="file"
                                            onChange={(e) => setMediaFile(e.target.files[0])}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                        />
                                    )}
                                    <div>
                                        <button onClick={handleEditSave}>Sauvegarder</button>
                                        <button onClick={() => setEditingElement(null)}>Annuler</button>
                                    </div>
                                </div>
                            </>
                        )}
                        {showPopup && (
                            <>
                                {/* Overlay sombre */}
                                <div className={style.modalOverlay} onClick={() => setShowPopup(false)}></div>
                                <div className={style.editModal}>
                                    <h3>Ajouter un Élement</h3>
                                    <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                                        <option value="">-- Choisissez un type --</option>
                                        <option value="title">Titre</option>
                                        <option value="desc">Description</option>
                                        <option value="images">Image</option>
                                        <option value="hr">Séparateur</option>
                                        <option value="video">Vidéo</option>
                                    </select>
                                    {selectedValue === 'title' ? (
                                        <input
                                            type="text"
                                            placeholder="Entrez le contenu"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                        />
                                    ) : null}
                                    {selectedValue === 'desc' ? (
                                        <textarea
                                            type="text"
                                            placeholder="Entrez le contenu"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                        />
                                    ) : null}
                                    {selectedValue === 'images' || selectedValue === 'video' ? (
                                        <input
                                            type="file"
                                            onChange={(e) => setMediaFile(e.target.files[0])}
                                        />
                                    ) : null}
                                    <div>
                                        <button onClick={handleAddElement}>Ajouter</button>
                                        <button onClick={() => setShowPopup(false)}>Annuler</button>
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
                draggedItem.index = index;
            }
        },
    });

    const renderElement = () => {
        console.log(element);
        switch (element.type) {
            case "title":
                return <Title title={element.data} />;
            case "desc":
                return <Description description={element.data} />;
            case "images":
                return <div><Image src={element.data.name} alt="Image description" /></div>;
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
