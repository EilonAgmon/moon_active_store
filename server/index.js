const express = require("express");
const path = require('path');
const offersRoute = require('./routes/routes');
const {initRedisWithMockData} = require('./services/init-mock-data-service.js');
const client = require("./DAL/redisClient");

const PORT = process.env.PORT || 3001;
const app = express();

client.on("ready", async () => {
  initRedisWithMockData(); // Add some offers to the DB
});

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use("/offers", offersRoute);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
    
app.listen(PORT, () => {
  console.log(`Active Moon offers server listening on ${PORT}`);
})

