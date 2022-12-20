const express = require("express");
const path = require('path');
const offersRoute = require('./routes/routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use("/offers", offersRoute);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
    
app.listen(PORT, () => {
  console.log(`Active Moon offers server listening on ${PORT}`);
})

