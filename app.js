const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const userRoutes = require("./routes/users.js");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {});

app.listen(PORT, () => console.log(`server port ${PORT}`));
