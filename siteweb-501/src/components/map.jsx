import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import L from 'leaflet';
import { selectEtablissements } from '../store/formation/formationSelector';
import 'leaflet/dist/leaflet.css'; // Assurez-vous que le style CSS de Leaflet est inclus

const Map = ({dataEtablissement}) => {
  console.log("etablissements : ", dataEtablissement)
  const mapContainer = useRef(null); // Référence pour le conteneur de la carte
  const mapRef = useRef(null); // Référence pour la carte elle-même
  // const etablissements = useSelector(selectEtablissements); // Récupérer les établissements depuis Redux
  const [citiesData, setCitiesData] = useState(null); // État pour stocker les données GeoJSON des villes
  const [departementData, setDepartementData] = useState(null); // État pour stocker les données GeoJSON des départements
  const [etablissements, setEtablissements] = useState([])

  useEffect(()=> {
    setEtablissements(dataEtablissement);
  })

  // Initialisation de la carte

  // console.log(etablissements);
  useEffect(() => {
    if (mapContainer.current && !mapRef.current) {
      // Initialiser la carte si elle n'est pas déjà initialisée
      mapRef.current = L.map(mapContainer.current).setView([48.100, -0.6200], 10); // Position initiale

      // Ajouter les tuiles OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }
  }, []);

  // Charger les données GeoJSON des départements (et éventuellement des villes)
  useEffect(() => {
    fetch('/assets/json/departements.geojson')  // Chemin vers ton fichier GeoJSON des départements
      .then(response => response.json())
      .then(data => {
        setDepartementData(data);  // Mettre à jour l'état avec les données
      })
      .catch(error => console.error('Erreur lors du chargement du fichier GeoJSON des départements:', error));

    fetch('/assets/json/city.geojson')  // Chemin vers ton fichier GeoJSON des villes
      .then(response => response.json())
      .then(data => setCitiesData(data))  // Mettre à jour l'état avec les données des villes
      .catch(error => console.error('Erreur lors du chargement du fichier GeoJSON des villes:', error));
  }, []);

  // Ajouter le département de la Mayenne à la carte
  useEffect(() => {
    if (mapRef.current && departementData) {
      const mayenne = departementData.features.find(department => department.properties.code === '53');  // Filtrer pour Mayenne

      if (mayenne) {
        // Ajouter le contour du département de la Mayenne
        L.geoJSON(mayenne, {
          style: {
            color: 'blue',  // Choisir la couleur du contour
            weight: 2,  // Largeur du contour
            opacity: 0.6,  // Opacité
            fillColor: 'lightblue',  // Couleur de remplissage
            fillOpacity: 0.2,  // Opacité du remplissage
          },
        }).addTo(mapRef.current);

        // Centrer la carte sur le département de la Mayenne
        const bounds = L.geoJSON(mayenne).getBounds();
        mapRef.current.fitBounds(bounds);  // Ajuster la vue pour que la Mayenne soit visible
      }
    }
  }, [departementData]);

  // Ajouter un gestionnaire de zoom
  useEffect(() => {
    console.log(mapRef.current.getZoom())
    console.log(mapRef.current);
    const zoomLevel = mapRef.current.getZoom();
    if (mapRef.current) {
      mapRef.current.on('zoomend', () => {
        

        // Si on est proche (zoom élevé), afficher les établissements avec une icône personnalisée
        if (zoomLevel >= 12) {
          displayEtablissements(true); // Passer true pour appliquer l'icône personnalisée
        } else {
          console.log("je fait appel a displayCircle")
          // Si on est éloigné, afficher les cercles avec les points comptés
          displayCircles();
        }
      });
    }

     // Si on est proche (zoom élevé), afficher les établissements avec une icône personnalisée
     if (zoomLevel >= 12) {
      displayEtablissements(true); // Passer true pour appliquer l'icône personnalisée
    } else {
      console.log("je fait appel a displayCircle")
      // Si on est éloigné, afficher les cercles avec les points comptés
      displayCircles();
    }
  }, [etablissements, citiesData]);

  // Fonction pour afficher les cercles (rayons) avec le nombre d'établissements
  const displayCircles = () => {
    console.log("je suis dans displayCircle")
    if (mapRef.current && citiesData) {
      // On supprime les cercles précédents (si existants)
      mapRef.current.eachLayer(layer => {
        if (layer instanceof L.Circle || layer instanceof L.Marker) {
          mapRef.current.removeLayer(layer);
        }
      });

      // Créer des cercles autour des villes
      citiesData.features.forEach(city => {
        const [lon, lat] = city.geometry.coordinates;
        const center = L.latLng(lat, lon);  // Créer un objet latLng pour le centre de la ville
        const radius = 5000; // Rayon du cercle (5 km)

        console.log(etablissements)
        // Calculer les établissements dans la zone
        const establishmentsInArea = etablissements.filter(etablissement => {
          const etablissementLatLng = L.latLng(etablissement.Latitude, etablissement.Longitude);
          const distance = center.distanceTo(etablissementLatLng); // Calcul de la distance en mètres
          return distance < radius; // Vérifier si l'établissement est dans le rayon de 5km
        });

        // Ajouter le cercle à la carte
        const circle = L.circle([lat, lon], {
          color: 'blue',
          fillColor: '#30a3e0',
          fillOpacity: 0.4,
          radius: radius,
        }).addTo(mapRef.current);

        // Ajouter un label avec le nombre d'établissements au centre du cercle
        const label = `${establishmentsInArea.length} établissement${establishmentsInArea.length > 1 ? 's' : ''}`;
        const divIcon = L.divIcon({
          className: 'leaflet-label',
          html: `<div style="color: black; font-size: 13px; font-weight: bold; text-align: center; text-wrap: nowrap; position: relative; top: -10px">${label}</div>`,
          iconSize: [50, 50], // Taille de l'icône, ajustable
          iconAnchor: [25, 25], // Centrer l'icône sur le cercle
        });

        // Placer l'icône au centre du cercle
        L.marker([lat, lon], { icon: divIcon }).addTo(mapRef.current);
      });
    }
  };

  // Fonction pour afficher les établissements (points) sur la carte
  const displayEtablissements = (zoomedIn = false) => {
    if (mapRef.current && etablissements) {
      // On supprime les cercles précédents (si existants)
      mapRef.current.eachLayer(layer => {
        if (layer instanceof L.Circle) {
          mapRef.current.removeLayer(layer);
        }
        if (layer instanceof L.Marker) {
          mapRef.current.removeLayer(layer);
        }
      });

      // Définir l'icône personnalisée (lorsque zoomé)
      const customIcon = new L.Icon({
        iconUrl: '/assets/images/location.svg', // Chemin vers votre icône personnalisée
        iconSize: [30, 30], // Taille de l'icône (ajustez selon vos préférences)
        iconAnchor: [15, 30], // Ancrage de l'icône
        popupAnchor: [0, -30], // Position du popup
      });

      // Ajouter chaque établissement avec un marqueur
      etablissements.forEach(etablissement => {
        const lat = etablissement.Latitude;
        const lon = etablissement.Longitude;
        const markerOptions = zoomedIn ? { icon: customIcon } : {}; // Appliquer l'icône personnalisée si zoomé

        const marker = L.marker([lat, lon], markerOptions).addTo(mapRef.current);

        // Ajouter un popup avec le nom et le lien (si disponible)
        const popupContent = `<b>${etablissement.nom}</b><br />${etablissement.link ? `<a href="${etablissement.link}" target="_blank">Visiter</a>` : ''}`;
        marker.bindPopup(popupContent);
      });
    }
  };

  return (
    <div
      ref={mapContainer}
      style={{
        width: '600px',
        height: '450px',
        background: '#FECFFF',
        borderRadius: '15px',
        boxShadow: '0px 0px 16px 3px rgba(0,0,0,0.15)',
      }}
    />
  );
};

export default Map;