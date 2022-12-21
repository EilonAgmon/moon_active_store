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
  
      if (allRedisKeys != []) {
        const allKeys = allRedisKeys.join(' '); 
        
        // Set the key for all existing keys for quick fetching of keys
        multi.set(constants.ALL_KEYS_KEY, allKeys);
      }
      
      await multi.exec();
}

module.exports = { initRedisWithMockData }