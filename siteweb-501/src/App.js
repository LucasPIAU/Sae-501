import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './components/map';
import ListCard from './components/listCard/listCard';

function App() {
  const [formations, setFormations] = useState([]);

  // Récupération des données depuis data.json
  useEffect(() => {
    fetch('/assets/json/data.json')
      .then(response => response.json())
      .then(data => {setFormations(data);console.log(data)}); // Sauvegarde les données récupérées
  }, []);

  console.log(formations)

  return (
    <div className="App">
      <div>App</div>
      <div className='containerMapFormation'>
        <Map />
        <ListCard items={formations} type="formation" />
      </div>
    </div>
  );
}

export default App;
