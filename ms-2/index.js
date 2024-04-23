const express = require("express");
const app = express();
const PORT = 5002;

app.get("/", (req, res) => {
  res.json({ id: 101, name: "Widget", price: 9.99 });
});

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});
