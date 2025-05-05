// Minimal Express server

const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send("Server is running.");
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
