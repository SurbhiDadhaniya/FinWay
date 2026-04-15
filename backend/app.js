const express = require("express");
const cors = require("cors");
require("dotenv").config()
const routes = require("./routes/index");
const ErrorHandler = require("./middlewares/ErrorHandler");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/index.html"))
});

app.use(ErrorHandler)
app.listen(3000, () => {
    console.log("Server started on port 3000");
});