import { useDispatch } from "react-redux";
import styles from "./List.module.css";
import { deleteEtablissement } from "../../store/formation/formationAsyncAction";

const EtablissementList = ({ etablissements, setFormData, setPopupMode, setPopupOpen }) => {
  const dispatch = useDispatch();
  
  const handleDelete = (id) => {
    dispatch(deleteEtablissement(id));
  };

  const handleOpenPopup = (etab) => {
    setPopupOpen(true);
    setPopupMode("edit");
    setFormData(etab);
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
                onClick={() => handleDelete(etablissement._id)}
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

export default EtablissementList;
