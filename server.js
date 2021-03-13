const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/static", express.static(path.join(`${__dirname}/build/static`)));
app.get("/*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/build/index.html`));
});

app.listen(PORT, () => console.log(`App Running on ${PORT}`));
