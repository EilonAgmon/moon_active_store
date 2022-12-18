import axios from 'axios';
const FETCH_OFFERS_API_URL = "/api/fetchOffers"

const fetchOffers = async () => {
  try {
      const response = await axios(FETCH_OFFERS_API_URL);
      const offersData = response.data ? response.data : [];
      return offersData;
    } catch(err) {
      return err.response.data;
    }
};

export default fetchOffers;
