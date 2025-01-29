import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./List.module.css";
import { useDispatch } from "react-redux";
import { deleteFormation } from "../../store/formation/formationAsyncAction";

const FormationList = ({ formations, setPopupOpen, setPopupMode, setFormData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteFormation(id));
  };

  const handleUpdateFormation = (id) => {
    navigate("/adminspace", { state: { itemId: id } });
  };

  const handleOpenPopup = (formation) => {
    setPopupOpen(true);
    setPopupMode("edit");
    setFormData(formation);
  };

  return (
    <div className={styles.containerList}>
      <ul className={styles.list}>
        {formations.map((formation) => (
          <li key={formation._id} className={styles.listItem}>
            <h3 className={styles.titleItemList}>{formation.name}</h3>
            <div>
              {formation.type !== "generale" && (
                <button
                  className={styles.buttonList}
                  onClick={() => handleUpdateFormation(formation._id)}
                >
                  Modifier la page
                </button>
              )}
              <button
                className={styles.buttonList}
                onClick={() => {
                  handleOpenPopup(formation);
                }}
              >
                Modifier
              </button>
              <button
                className={styles.buttonListDelete}
                onClick={() => handleDelete(formation._id)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormationList;
