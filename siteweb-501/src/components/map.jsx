import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const Map = () => {
  useEffect(() => {
    async function loadMapData() {
      try {
        // Charger les données de la Mayenne depuis le fichier GeoJSON
        const responseMayenne = await fetch('/assets/json/mayenneV2.geojson');
        const mayenneData = await responseMayenne.json();
        //console.log("Données Mayenne:", mayenneData);

        // Charger les données des routes
        const responseCitiesAndRoutes = await fetch('/assets/json/routeMayenne.geojson');
        const citiesAndRoutes = await responseCitiesAndRoutes.json();
        //console.log("Données supplémentaires (villes et routes):", citiesAndRoutes);

        // Charger les données des villes
        const responseVilles = await fetch('/assets/json/BigVilleMayenne.geojson');
        const villesData = await responseVilles.json();
        //console.log("Données des villes:", villesData);

        // Charger les données des établissements
        const responseEtablissements = await fetch('/assets/json/data.json');
        const etablissementsData = await responseEtablissements.json();
        //console.log("Données des établissements:", etablissementsData);

        function createOptionForMayenne() {
          const routes = citiesAndRoutes.features || [];
          const villes = villesData.features || [];

          //console.log("Routes extraites:", routes);
          //console.log("Villes extraites:", villes);

          // Formater les données des routes
          const routeData = routes
            .filter(route => route.geometry && route.geometry.coordinates)
            .map(route => ({
              name: route.properties.name || "Route sans nom",
              coords: route.geometry.coordinates.map(coord => coord)
            }));

          // Formater les données des villes
          const villesPoints = villes.map(ville => ({
            name: ville.properties.name || "Ville sans nom",
            value: ville.geometry.coordinates,
          }));

          // Formater les données des établissements
          const etablissementsPoints = etablissementsData.map(etablissement => ({
            name: etablissement.nom,
            value: etablissement.coordinates,
          }));

          return {
            geo: {
              nameProperty: 'name',
              map: 'Mayenne',
              roam: true,
              zoom: 95,
              center: [-0.6200, 48.100],
              scaleLimit: {
                min: 50,
              },
              itemStyle: {
                areaColor: '#fff',
              },
              emphasis: {
                label: {
                  show: false,
                  color: 'white',
                  fontFamily: 'Barlow, Arial, sans-serif',
                },
                itemStyle: {
                  areaColor: '#FFFFFF',
                },
              },
            },
            series: [
              // Série pour les routes principales
              {
                name: 'Routes principales',
                type: 'lines',
                coordinateSystem: 'geo',
                polyline: true,
                data: routeData,
                lineStyle: {
                  color: '#000000',
                  width: 2,
                  opacity: 0.1,
                  type: 'solid',
                },
                smooth: true,
              },
              // Série pour les villes
              {
                name: 'Villes',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: villesPoints,
                symbolSize: 8,
                itemStyle: {
                  color: '#ff0000',
                },
                label: {
                  show: true,
                  formatter: '{b}',
                  position: 'right',
                  fontSize: 15,
                  color: '#000000',
                  fontFamily: 'Barlow, Arial, sans-serif',
                },
              },
              // Série pour les établissements
              {
                name: 'Établissements',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: etablissementsPoints,
                symbol: 'diamond', // Vous pouvez changer ce symbole selon votre besoin
                symbolSize: 10,
                itemStyle: {
                  color: '#0000ff',
                },
                label: {
                  show: false,
                  formatter: '{b}',
                  position: 'right',
                  fontSize: 12,
                  color: '#0000ff',
                  fontFamily: 'Barlow, Arial, sans-serif',
                },
              },
            ],
            tooltip: {
              show: false,
              formatter: '{b}',
            },
          };
        }

        const chartDom = document.getElementById('map');
        const myChart = echarts.init(chartDom);

        myChart.showLoading();

        // Enregistrer la carte de la Mayenne avec les données de mayenneV2.geojson
        echarts.registerMap('Mayenne', mayenneData);

        myChart.hideLoading();
        myChart.setOption(createOptionForMayenne());
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    }

    loadMapData();
  }, []);

  return (
    <div id="map" className="map" style={{width: '600px', height: '400px', background: "#FECFFF", borderRadius: "15px", boxShadow: "0px 0px 16px 3px rgba(0,0,0,0.15)" }}></div>
  );
};

export default Map;
