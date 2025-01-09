import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Importation des styles de Leaflet
import { selectFilteredEtablissements, selectCurrentEtablissement } from '../store/formation/formationSelector';

const Map = () => {
  const mapContainer = useRef(null); // Référence pour le conteneur de la carte
  const mapRef = useRef(null); // Référence pour l'objet Leaflet de la carte
  const etablissementsData = useSelector(selectFilteredEtablissements); // Sélection des établissements via Redux
  const currentEtablissement = useSelector(selectCurrentEtablissement); // Établissement actuellement sélectionné
  const [citiesData, setCitiesData] = useState(null); // GeoJSON des villes
  const [departementData, setDepartementData] = useState(null); // GeoJSON des départements

  const initialCenter = [48.1, -0.52]; // Position initiale de la carte
  const initialZoom = 9;
  
  console.log("map Current: ", currentEtablissement);

  // Initialisation de la carte
  useEffect(() => {
    if (!mapRef.current && mapContainer.current) {
      mapRef.current = L.map(mapContainer.current).setView(initialCenter, initialZoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }
  }, []);

  // Charger les données GeoJSON
  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const [departementsRes, citiesRes] = await Promise.all([
          fetch('/assets/json/departements.geojson'),
          fetch('/assets/json/city.geojson'),
        ]);

        setDepartementData(await departementsRes.json());
        setCitiesData(await citiesRes.json());
      } catch (error) {
        console.error('Erreur lors du chargement des données GeoJSON:', error);
      }
    };

    fetchGeoJSON();
  }, []);

  // Afficher le département de la Mayenne
  useEffect(() => {
    if (mapRef.current && departementData) {
      const mayenne = departementData.features.find(d => d.properties.code === '53');
      if (mayenne) {
        L.geoJSON(mayenne, {
          style: {
            color: 'blue',
            weight: 2,
            fillColor: 'transparent',
            fillOpacity: 0.3,
          },
        }).addTo(mapRef.current);
        mapRef.current.fitBounds(L.geoJSON(mayenne).getBounds());
      }
    }
  }, [departementData]);

// Gérer l'établissement sélectionné ou réinitialiser la vue
useEffect(() => {
  if (mapRef.current) {
    // Nettoyer les marqueurs existants
    mapRef.current.eachLayer(layer => {
      if (layer instanceof L.Marker || layer instanceof L.Circle) {
        mapRef.current.removeLayer(layer);
      }
    });

    console.log(currentEtablissement);

    if (currentEtablissement) {
      const etablissement = etablissementsData.find(e => e.name === currentEtablissement);
      console.log(etablissement);
      if (etablissement) {
        const lon = etablissement.Longitude;
        const lat = etablissement.Latitude;


        const customIcon = L.icon({
          iconUrl: '/assets/images/location.svg',
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        });

        mapRef.current.setView([lat, lon], 12); // Zoomer sur l'établissement
      }
    } else {
      // Réinitialiser la vue et le zoom
      mapRef.current.setView(initialCenter, initialZoom);
      displayCircles(); // Afficher les cercles après réinitialisation
    }
  }
}, [currentEtablissement, etablissementsData, citiesData]);
  
  // Afficher les cercles ou les établissements selon le niveau de zoom
  useEffect(() => {
    const updateDisplay = () => {
      if (mapRef.current) {
        const zoomLevel = mapRef.current.getZoom();
        if (zoomLevel >= 12) {
          displayEtablissements(true);
        } else {
          displayCircles();
        }
      }
    };

    if (mapRef.current) {
      mapRef.current.on('zoomend', updateDisplay);
      return () => mapRef.current.off('zoomend', updateDisplay);
    }
  }, [etablissementsData, citiesData]);

  const displayCircles = () => {
    if (mapRef.current && citiesData) {
      mapRef.current.eachLayer(layer => {
        if (layer instanceof L.Circle || layer instanceof L.Marker) {
          mapRef.current.removeLayer(layer);
        }
      });

      citiesData.features.forEach(city => {
        const [lon, lat] = city.geometry.coordinates;
        const center = L.latLng(lat, lon);
        const radius = 5000;

        const establishmentsInArea = etablissementsData.filter(e => {
          const etablissementLatLng = L.latLng(e.Latitude, e.Longitude);
          return center.distanceTo(etablissementLatLng) < radius;
        });

        const circle = L.circle([lat, lon], {
          color: 'blue',
          fillColor: '#30a3e0',
          fillOpacity: 0.3,
          radius,
        }).addTo(mapRef.current);

        const divIcon = L.divIcon({
          className: 'leaflet-label',
          html: `<div style="text-align:center;font-size:13px;">${establishmentsInArea.length} établissement${establishmentsInArea.length > 1 ? 's' : ''}</div>`,
        });

        L.marker([lat, lon], { icon: divIcon }).addTo(mapRef.current);
      });
    }
  };

  const displayEtablissements = zoomedIn => {
    if (mapRef.current && etablissementsData) {
      mapRef.current.eachLayer(layer => {
        if (layer instanceof L.Marker || layer instanceof L.Circle) {
          mapRef.current.removeLayer(layer);
        }
      });

      const customIcon = L.icon({
        iconUrl: '/assets/images/location.svg',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      });

      etablissementsData.forEach(e => {
        const lon = e.Longitude;
        const lat = e.Latitude;
        L.marker([lat, lon], zoomedIn ? { icon: customIcon } : {}).addTo(mapRef.current)
        .bindPopup(`<b>${e.nom}</b><br/><a href="${e.link}" target="_blank">Visiter</a>`);
      });
    }
  };

  return (
    <div
      ref={mapContainer}
      style={{
        width: '600px',
        height: '450px',
        borderRadius: '15px',
        boxShadow: '0 0 16px rgba(0,0,0,0.15)',
      }}
    />
  );
};

export default Map;
