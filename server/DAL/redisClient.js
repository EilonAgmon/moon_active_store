const redis = require("redis");
const client = redis.createClient();

(async () => {
    await client.connect();
})();

client.on("error", (err) => {
    console.log("Error in connection to Redis " + err);
});

client.on("ready", () => {
    console.log("Success connecting to Redis");
});

module.exports = client;