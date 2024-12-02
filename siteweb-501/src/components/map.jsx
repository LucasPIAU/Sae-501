import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { useSelector } from 'react-redux';
import { selectFilteredEtablissements } from '../store/formation/formationSelector';

const Map = () => {

  const [etablissementsData, setEtablissementsData] = useState([]);
  const storeData = useSelector(selectFilteredEtablissements);
  console.log('storeData : ', storeData);

  useEffect(()=>{
    setEtablissementsData(storeData);
    console.log('établissement de la map : ', storeData);
  },[storeData])

  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
  


  useEffect(() => {
    async function loadMapData() {
      try {
        const responseMayenne = await fetch('/assets/json/mayenneV2.geojson');
        const mayenneData = await responseMayenne.json();
  
        const responseCitiesAndRoutes = await fetch('/assets/json/routeMayenne.geojson');
        const citiesAndRoutes = await responseCitiesAndRoutes.json();
  
        const responseVilles = await fetch('/assets/json/BigVilleMayenne.geojson');
        const villesData = await responseVilles.json();
  
        const chartDom = document.getElementById('map');
        const myChart = echarts.init(chartDom);
  
        myChart.showLoading();
        echarts.registerMap('Mayenne', mayenneData);
        myChart.hideLoading();
  
        // Fonction pour créer l'option
        const createOption = (zoomLevel, center) => {
          const routes = citiesAndRoutes.features || [];
          const villes = villesData.features || [];
  
          // Formater les données des routes
          const routeData = routes.map(route => ({
            name: route.properties.name || 'Route sans nom',
            coords: route.geometry.coordinates,
          }));
  
          // Grouper les établissements par ville
          const villesPoints = villes.map(ville => {
            const villeCoords = ville.geometry.coordinates;
            const etablissementsInVille = etablissementsData.filter(etab => {
              const [etabLon, etabLat] = etab.coordinates;
              return (
                Math.abs(etabLon - villeCoords[0]) < 0.1 &&
                Math.abs(etabLat - villeCoords[1]) < 0.1
              );
            });
            return {
              name: `${ville.properties.name || 'Ville'} (${etablissementsInVille.length})`,
              value: villeCoords,
            };
          });
  
          // Formater les données des établissements
          const etablissementsPoints = etablissementsData.map(etab => ({
            name: etab.nom,
            value: etab.coordinates,
          }));
  
          return {
            geo: {
              map: 'Mayenne',
              roam: true,
              label: false,
              zoom: zoomLevel,
              center: center || [-0.6200, 48.100], // Utiliser le center si défini, sinon une valeur par défaut
              scaleLimit: {
                min: 50,
              },
              itemStyle: {
                areaColor: '#fff',
              },
            },
            series: [
              // Routes principales
              {
                name: 'Routes principales',
                type: 'lines',
                coordinateSystem: 'geo',
                data: routeData,
                polyline: true,
                lineStyle: {
                  color: '#000000',
                  width: 2,
                  opacity: 0.1,
                  type: 'solid',
                },
                smooth: true,
              },
              // Villes ou établissements en fonction du zoom
              ...(zoomLevel < 200
                ? [
                    {
                      name: 'Villes',
                      type: 'scatter',
                      coordinateSystem: 'geo',
                      data: villesPoints,
                      symbolSize: 10,
                      itemStyle: {
                        color: '#ff0000',
                      },
                      label: {
                        show: true,
                        formatter: '{b}',
                        position: 'right',
                        fontSize: 15,
                      },
                    },
                  ]
                : [
                    {
                      name: 'Établissements',
                      type: 'scatter',
                      coordinateSystem: 'geo',
                      data: etablissementsPoints,
                      symbol: 'diamond',
                      symbolSize: 10,
                      itemStyle: {
                        color: '#0000ff',
                      },
                      label: {
                        show: true,
                        formatter: '{b}',
                        position: 'right',
                        fontSize: 12,
                      },
                    },
                  ]),
            ],
          };
        };
  
        // Initialiser la carte avec le niveau de zoom par défaut
        let currentZoom = 95;
        let currentCenter = [-0.6200, 48.100]; // Initial center
        myChart.setOption(createOption(currentZoom, currentCenter));
  
        // Mettre à jour la carte lors des zooms
        myChart.on(
          'geoRoam',
          debounce((params) => {
            if (params.zoom !== undefined) {
              const newZoom = myChart.getModel().option.geo[0].zoom;
              const newCenter = myChart.getModel().option.geo[0].center; // Récupérer le center actuel
              if (Math.abs(newZoom - currentZoom) > 10) {
                currentZoom = newZoom;
                currentCenter = newCenter; // Mettre à jour le center courant
                myChart.setOption(createOption(currentZoom, currentCenter));
              }
            }
          }, 200)
        );
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    }
  
    loadMapData();
  }, [etablissementsData]);
  
  


  return (
    <div id="map" className="map" style={{width: '600px', height: '450px', background: "#FECFFF", borderRadius: "15px", boxShadow: "0px 0px 16px 3px rgba(0,0,0,0.15)" }}></div>
  );
};

export default Map;
