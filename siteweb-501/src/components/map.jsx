import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const Map = () => {
  useEffect(() => {
    async function loadMapData() {
      try {
        // Charger les données Mayenne depuis le fichier GeoJSON
        const responseMayenne = await fetch('/assets/json/mayenneV2.geojson');
        const mayenneData = await responseMayenne.json();
        console.log("Données Mayenne:", mayenneData);  // Log des données Mayenne

        const responseCitiesAndRoutes = await fetch('/assets/json/routeMayenne.geojson');
        const citiesAndRoutes = await responseCitiesAndRoutes.json();
        console.log("Données supplémentaires (villes et routes):", citiesAndRoutes);

        function createOptionForMayenne() {

          const routes = citiesAndRoutes.features || [];

          console.log("Routes extraites:", routes);

          const routeData = routes
            .filter(route => route.geometry && route.geometry.coordinates)
            .map(route => ({
              name: route.properties.name || "Route sans nom",
              coords: route.geometry.coordinates.map(coord => coord)
            }));

          console.log("Données des routes:", routeData);

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
              // Séries pour les routes principales
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
            ],
            tooltip: {
              show: true,
              formatter: '{b}',
            },
          };
        }

        const chartDom = document.getElementById('map');
        const myChart = echarts.init(chartDom);

        myChart.showLoading();

        // Enregistrer la carte de la Mayenne directement avec les données de mayenneV2.geojson
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
    <div id="map" className="map" style={{ width: '600px', height: '400px', background: "#FECFFF" }}></div>
  );
};

export default Map;