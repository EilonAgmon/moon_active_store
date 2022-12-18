const express = require("express");
const path = require('path');
const mockOffersData = require('./mockData.json');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api/fetchOffers", (req, res) => {
    res.send(mockOffersData);

//   const errorReponse = {
//     code: 127,
//     errorMessage: "somethine broke",
//     isError: true
//   }
//   res.status(500).send(errorReponse);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Active Moon offers server listening on ${PORT}`);
});

