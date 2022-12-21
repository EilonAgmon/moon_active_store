import axios from 'axios';
const PURCHASE_OFFER_API_URL = "offers/purchaseOffer"

const purchaseOffer = async (offerID) => {
  try {
      const response = await axios.get(PURCHASE_OFFER_API_URL, { params: { offerId: offerID } });
      const offersData = response.data ? response.data : [];
      return offersData;
    } catch(err) {
      return err.response.data;
    }
};

export default purchaseOffer;
