import React, { useState } from 'react';

const EtablissementList = ({ etablissements}) => {
  const [newEtablissement, setNewEtablissement] = useState('');
  const [selectedEtablissement, setSelectedEtablissement] = useState(null);

  const handleAddEtablissement = () => {

  };

  const handleUpdateEtablissement = (id) => {

  };

  return (
    <div>
      <ul>
        {etablissements.map((etablissement) => (
          <li key={etablissement.id}>
            {etablissement.name}
            <button onClick={() => handleUpdateEtablissement(etablissement.id)}>Modifier</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddEtablissement}>Ajouter</button>
      
    </div>
  );
};

export default EtablissementList;
