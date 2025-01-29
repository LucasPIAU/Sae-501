import axios from 'axios';

const fetchCoordinates = async (city) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: city,
        format: 'json',
        limit: 1,
      },
    });
    console.log(response)
    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return [parseFloat(lon), parseFloat(lat)]; // Retourne les coordonnées [longitude, latitude]
    } else {
      throw new Error('Ville introuvable');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des coordonnées :', error);
    return null;
  }
};

export default fetchCoordinates;
