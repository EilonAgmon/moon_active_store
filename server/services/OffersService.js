const PurchaseResponseDTO = require('../models/PurchaseResponseDTO');
const ListResponseDTO = require('../models/ListResponseDTO.js');
const ErrorResponseDTO = require('../models/ErrorResponseDTO.js');
const mockOffersData = require('../mockData/mockData.json');
const client = require("../DAL/redisClient");

client.on("ready", async () => {
  initDBWithMockData();
});

const initDBWithMockData = async () => {
    let promises = [];
    mockOffersData.forEach(async (mockOffer) => {
      promises.push(client.HSET(String("offer_"+mockOffer.id), 
      ["id", String(mockOffer.id), "name", mockOffer.name, "currentCount", mockOffer.currentCount, "limit", mockOffer.limit]));
    })
  await Promise.all(promises);
}
  
const getAllOffers = async (res) => {
  try {
    const keys = await client.keys('*');
    let allOffers = [];
    keys.forEach(async (offerKey) => {
      const offerProm = client.HGETALL(offerKey);
      allOffers.push(offerProm);
    })
    const offers = await Promise.all(allOffers);
    const responseDTO = new ListResponseDTO({offers: offers, success: true, message: ""});
    res.json(responseDTO);
  } catch (error) {
    const errorResponseDTO = new ErrorResponseDTO({message: error});
    res.json(errorResponseDTO);
  }
};

const purchaseOffer = async (req, res) => {
  
  try {
    const offerId = req?.query?.offerId;

    if (!offerId) {
      throw "No offer ID provided";
    }
    const id = "offer_" + offerId;
    const offer = await client.HMGET(id, ["currentCount", "limit", "name"]);

    if (offer[0] == null) {
      throw "Could not find offer in DB";
    }

    const offerObj = {
      currentCount: offer[0],
      limit: offer[1],
      name: offer[2]
    }

    // check if limit is reached
    if (offerObj.currentCount == offerObj.limit) {
      throw "limit of offer " + offerObj.name + " has been reached";
    }

    // Update the offer's counter atomically
    let updatedCount = await client.HINCRBY(id, "currentCount", 1);

    // Fallback for cases where a different client (from a different pod perhaps)
    // Updated the same offer, causing a race condifition which caused the limit to be exceeded
    if (updatedCount > offerObj.limit) {
      // Fix the data
      await client.HSET(id, "currentCount", offerObj.limit);
      throw "limit of offer " + offerObj.name + " has been reached";
    }

    // Call external API for purchasing the offer
    // someService.do(id)
    
    updatedCount = Math.min(updatedCount, offerObj.limit);
    const purchaseResponseDTO = new PurchaseResponseDTO(
      {id: offerId,
      count: updatedCount, 
      success: true, 
      message: ""});
      res.json(purchaseResponseDTO);

  } catch (error) {
    const errorResponseDTO = new ErrorResponseDTO({message: error});
    res.json(errorResponseDTO);
  }
};

module.exports = { getAllOffers,  purchaseOffer}