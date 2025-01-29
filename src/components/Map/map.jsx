import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import style from './Map.module.css';

const Map = ({ dataEtablissement, hoveredEtablissement }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [citiesData, setCitiesData] = useState(null);
  const [departementData, setDepartementData] = useState(null);
  const [etablissements, setEtablissements] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(8);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  useEffect(() => {
    setEtablissements(dataEtablissement);
  }, [dataEtablissement]);

  useEffect(() => {
    if (hoveredEtablissement && mapRef.current) {
      const { Latitude, Longitude } = hoveredEtablissement;
      mapRef.current.setView([Latitude, Longitude], 13, { animate: true });
    } else if (mapRef.current) {
      mapRef.current.setView([48.100, -0.6200], 9, { animate: true });
    }
  }, [hoveredEtablissement]);

  useEffect(() => {
    if (mapContainer.current && !mapRef.current) {
      mapRef.current = L.map(mapContainer.current).setView([48.100, -0.6200], 9);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);

      mapRef.current.on('zoomend', () => {
        setZoomLevel(mapRef.current.getZoom());
      });

      mapRef.current.on('movestart', () => {
        setIsUserInteracting(true);
      });
    }
  }, []);

  useEffect(() => {
    fetch('/assets/json/departements.geojson')
      .then(response => response.json())
      .then(data => setDepartementData(data))
      .catch(error => console.error('Erreur chargement départements:', error));

    fetch('/assets/json/city.geojson')
      .then(response => response.json())
      .then(data => setCitiesData(data))
      .catch(error => console.error('Erreur chargement villes:', error));
  }, []);

  useEffect(() => {
    if (!mapRef.current || !citiesData) return;
    displayCirclesOrMarkers();
  }, [etablissements, citiesData, zoomLevel]);

  useEffect(() => {
    if (mapRef.current && departementData) {
      const mayenne = departementData.features.find(dept => dept.properties.code === '53');
      if (mayenne) {
        L.geoJSON(mayenne, {
          style: { color: 'blue', weight: 1, opacity: 0.5, fillOpacity: 0 },
        }).addTo(mapRef.current);
      }
    }
  }, [departementData]);

  const displayCirclesOrMarkers = () => {
    if (!mapRef.current || !citiesData) return;

    mapRef.current.eachLayer(layer => {
      if (layer instanceof L.Circle || layer instanceof L.Marker) {
        mapRef.current.removeLayer(layer);
      }
    });

    let cityBounds = [];

    citiesData.features.forEach(city => {
      const [lon, lat] = city.geometry.coordinates;
      const center = L.latLng(lat, lon);
      const radius = 7000;

      const establishmentsInArea = etablissements.filter(etablissement => {
        const etablissementLatLng = L.latLng(etablissement.Latitude, etablissement.Longitude);
        return center.distanceTo(etablissementLatLng) < radius;
      });

      if (establishmentsInArea.length > 0) {
        cityBounds.push(center);

        if (zoomLevel <= 10) {
          L.circle([lat, lon], {
            color: 'blue', opacity: 0.4, fillColor: '#30a3e0', fillOpacity: 0.2, radius,
          }).addTo(mapRef.current);

          const label = `${establishmentsInArea.length} établissement${establishmentsInArea.length > 1 ? 's' : ''}`;
          const divIcon = L.divIcon({
            className: 'leaflet-label',
            html: `<div style="color: black; font-size: 13px; font-weight: bold; margin">${label}</div>`,
            iconSize: [150, 50],
            iconAnchor: [50, 55],
          });
          L.marker([lat, lon], { icon: divIcon }).addTo(mapRef.current);
        } else {
          const redMarker = L.divIcon({
            className: 'custom-pin',
            html: `<div style="width: 12px; height: 12px; background-color: red; border-radius: 50%; box-shadow: 0 0 6px rgba(0,0,0,0.6);"></div>`,
            iconSize: [12, 12],
            iconAnchor: [6, 6],
          });

          establishmentsInArea.forEach(etablissement => {
            L.marker([etablissement.Latitude, etablissement.Longitude], { icon: redMarker }).addTo(mapRef.current);
          });
        }
      }
    });

    if (!isUserInteracting) {
      if (cityBounds.length === 1) {
        mapRef.current.setView(cityBounds[0], 11);
      } else if (cityBounds.length > 1) {
        const bounds = L.latLngBounds(cityBounds);
        mapRef.current.fitBounds(bounds);
      } else {
        mapRef.current.setView([48.100, -0.6200], 9);
      }
    }
  };

  return <div ref={mapContainer} className={style.containerMap} style={{ background: '#FECFFF', borderRadius: '15px', boxShadow: '0px 0px 16px 3px rgba(0,0,0,0.15)' }} />;
};

export default Map;
