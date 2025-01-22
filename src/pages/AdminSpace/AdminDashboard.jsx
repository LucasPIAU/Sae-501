import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormationList from "../../components/admin/FormationList";
import EtablissementList from "../../components/admin/EtablissementList";
import {
  selectEtablissements,
  selectFormations,
} from "../../store/formation/formationSelector";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState("");

  const formations = useSelector(selectFormations);
  const etablissements = useSelector(selectEtablissements);

  return (
    <div>
      <h1>Panel d'administration</h1>
      <nav>
        <button onClick={() => setDisplay("formation")}>Formations</button>
        <button onClick={() => setDisplay("etablissement")}>
          Etablissements
        </button>
      </nav>
      {display === "formation" && (
        <div>
          <h2>Formations</h2>
          <FormationList formations={formations} />
        </div>
      )}
      {display === "etablissement" && (
        <div>
          <h2>Etablissements</h2>
          <EtablissementList etablissements={etablissements} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
