import { useDispatch } from "react-redux";
import styles from "./List.module.css";
import { deleteEtablissement } from "../../store/formation/formationAsyncAction";
import { useState } from "react";
import ConfirmPopup from "./ConfirmPopup";

const EtablissementList = ({
  etablissements,
  setFormData,
  setPopupMode,
  setPopupOpen,
}) => {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [toDeleteId, setToDeleteId] = useState("");

  const handleDelete = (id) => {
    dispatch(deleteEtablissement(id));
    setToDeleteId("");
    setShowConfirm(false);
  };

  const handleOpenPopup = (etab) => {
    setPopupOpen(true);
    setPopupMode("edit");
    setFormData(etab);
  };

  const handleConfirmationOpen = (id) => {
    setToDeleteId(id);
    setShowConfirm(true);
  };

  return (
    <div className={styles.containerList}>
      <ul className={styles.list}>
        {etablissements.map((etablissement) => (
          <li key={etablissement._id} className={styles.listItem}>
            <h3>{etablissement.name}</h3>
            <div>
            <button
              className={styles.buttonList}
              onClick={() => handleOpenPopup(etablissement)}
            >
              Modifier
            </button>
            <button
              className={styles.buttonListDelete}
              onClick={() => handleConfirmationOpen(etablissement._id)}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
      {showConfirm && (
        <ConfirmPopup
          onCancel={() => {
            setShowConfirm(false);
          }}
          onConfirm={() => {
            handleDelete(toDeleteId);
          }}
          message={`Voulez-vous vraiment supprimer l'élément ?`}
        />
      )}
    </div>
  );
};

export default EtablissementList;
