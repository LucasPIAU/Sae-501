import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import $ from 'jquery'; // Assure-toi d'avoir installé jQuery

const Map = () => {
  useEffect(() => {
    function createOptionForMayenne() {
      return {
        geo: {
          nameProperty: 'nom',
          map: 'Mayenne',
          roam: true,
          zoom: 1,
            scaleLimit: {
                min: 1,
            },
          itemStyle: {
            areaColor: '#fff',
          },
          emphasis: {
            label: {
              show: true,
              color: 'white',
              fontFamily: 'Barlow, Arial, sans-serif',
            },
            itemStyle: {
              areaColor: '#FFFFFF',
            },
          },
        },
        series: [
          {
            name: 'Villes',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [
              { name: 'Laval', value: [-0.7782, 48.0651] },
              { name: 'Château-Gontier', value: [-0.7062, 47.8286] },
              { name: 'Mayenne', value: [-0.6133, 48.3038] },
            ],
            symbolSize: 8,
            label: {
              show: true,
              formatter: '{b}',
              position: 'right',
            },
            itemStyle: {
              color: '#ff5733',
            },
          },
        ],
        tooltip: {
          trigger: 'item',
          formatter: (params) => params.name,
        },
      };
    }

    // Initialiser la carte ECharts
    const chartDom = document.getElementById('map');
    const myChart = echarts.init(chartDom);

    myChart.showLoading();
    $.get('/assets/json/departements.geojson', (geoJson) => {
      const mayenneData = geoJson.features.filter(
        (feature) => feature.properties.nom === 'Mayenne'
      );

      if (mayenneData.length > 0) {
        geoJson.features = mayenneData;
        echarts.registerMap('Mayenne', geoJson);

        myChart.hideLoading();
        myChart.setOption(createOptionForMayenne());
      } else {
        myChart.hideLoading();
        console.error("Le département de la Mayenne n'a pas été trouvé dans le fichier geojson.");
      }
    });
  }, []);

  return (
    <div id="map" className="map" style={{ width: '600px', height: '400px', background: "#FECFFF" }}></div>
  );
};

export default Map;
