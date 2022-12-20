const mockOffersData = require('../mockData/mockData.json');
const client = require("../DAL/redisClient");
var constants = require('../common/constants');

const initRedisWithMockData = async () => {
    let offerId, redisId = "";
    let allRedisKeys = [];
    let multi = client.multi();

    mockOffersData.forEach(async (mockOffer) => {
        offerId = String(mockOffer.id);
        redisId = constants.OFFER_KEY_PREFIX + offerId;
        allRedisKeys.push(redisId);
        multi.HSET(redisId, 
        ["id", offerId, "name", mockOffer.name, "currentCount", mockOffer.currentCount, "limit", mockOffer.limit]);
      });
  
      const allKeys = allRedisKeys.join(' '); 
      console.log("All the values " + allKeys);
  
      // Set the key for all existing keys for quick fetching of keys
      multi.set(constants.ALL_KEYS_KEY, allKeys);
  
      await multi.exec();
}

module.exports = { initRedisWithMockData }

// let promises = [];
//     let id;
//     let multi = client.multi();
//     mockOffersData.forEach(async (mockOffer) => {
//       id = String("offer_" + mockOffer.id);
//       promises.push(client.HSET(id, 
//       ["id", id, "name", mockOffer.name, "currentCount", mockOffer.currentCount, "limit", mockOffer.limit]));
//     })

//     // mockOffersData.forEach(async (mockOffer) => {
//     //     id = String("offer_" + mockOffer.id);
//     //     multi.HSET(id, 
//     //     ["id", id, "name", mockOffer.name, "currentCount", mockOffer.currentCount, "limit", mockOffer.limit]);
//     //   })

//     await multi.exec();