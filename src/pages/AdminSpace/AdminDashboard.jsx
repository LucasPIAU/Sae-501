import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormationList from '../../components/admin/FormationList';
import EtablissementList from '../../components/admin/EtablissementList';
import { selectEtablissements, selectFormations } from '../../store/formation/formationSelector';

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const formations = useSelector(selectFormations);
  const etablissements = useSelector(selectEtablissements);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <button onClick={() => alert('Naviguer vers les formations')}>Formations</button>
        <button onClick={() => alert('Naviguer vers les établissements')}>Etablissements</button>
      </nav>

      <div>
        <h2>Formations</h2>
        <FormationList formations={formations} />
      </div>

      <div>
        <h2>Etablissements</h2>
        <EtablissementList etablissements={etablissements} addEtablissement={()=>{}} updateEtablissement={()=>{}} />
      </div>
    </div>
  );
};

export default AdminDashboard;
