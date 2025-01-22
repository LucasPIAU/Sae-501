import React from 'react';
import { useNavigate } from 'react-router-dom';

const FormationList = ({ formations }) => {
    const navigate = useNavigate();

  const handleAddFormation = () => {

  };

  const handleUpdateFormation = (id) => {
    navigate('/adminspace', { state: { itemId: id } })
  };

  return (
    <div>
      <ul>
        {formations.map((formation) => (
          <li key={formation.id}>
            {formation.name}
            <button onClick={()=> handleUpdateFormation(formation.id)}>Modifier</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddFormation}>Ajouter</button>
      
      
    </div>
  );
};

export default FormationList;
