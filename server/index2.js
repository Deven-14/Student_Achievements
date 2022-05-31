require("dotenv").config();
require("./config/database").connect();
const express = require('express');
const routes = require("./src/routes");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// http to https
app.enable('trust proxy');
app.use((req, res, next) => {

    if(req.headers.host != "localhost:3000") {
        req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
    } else {
        next();
    }

});

app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("Working");
});

app.listen(port, () => {
    console.log(`this log is working on ${port}`);
});