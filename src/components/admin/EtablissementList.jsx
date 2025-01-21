import React, { useState } from 'react';

const EtablissementList = ({ etablissements, addEtablissement, updateEtablissement }) => {
  const [newEtablissement, setNewEtablissement] = useState('');
  const [selectedEtablissement, setSelectedEtablissement] = useState(null);

  const handleAddEtablissement = () => {
    if (newEtablissement) {
      addEtablissement({ id: Date.now(), name: newEtablissement });
      setNewEtablissement('');
    }
  };

  const handleUpdateEtablissement = () => {
    if (selectedEtablissement && selectedEtablissement.name) {
      updateEtablissement(selectedEtablissement);
      setSelectedEtablissement(null);
    }
  };

  return (
    <div>
      <ul>
        {etablissements.map((etablissement) => (
          <li key={etablissement.id}>
            {etablissement.name}
            <button onClick={() => setSelectedEtablissement(etablissement)}>Modifier</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newEtablissement}
        onChange={(e) => setNewEtablissement(e.target.value)}
        placeholder="Ajouter un établissement"
      />
      <button onClick={handleAddEtablissement}>Ajouter</button>
      
      {selectedEtablissement && (
        <div>
          <input
            type="text"
            value={selectedEtablissement.name}
            onChange={(e) => setSelectedEtablissement({ ...selectedEtablissement, name: e.target.value })}
          />
          <button onClick={handleUpdateEtablissement}>Mettre à jour</button>
        </div>
      )}
    </div>
  );
};

export default EtablissementList;
