import dotenv from "dotenv";
import dbConnet from "./../src/config/database.js";
import express from "express";
import { adminRouter } from "./../src/routes/index.js";

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// http to https
app.enable('trust proxy');
app.use((req, res, next) => {

    if(req.headers.host != `localhost:${port}`) {
        req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
    } else {
        next();
    }

});

app.all("/", (req, res) => {
    res.send("Working, In Admin Server");
});

app.use("/api/admin", adminRouter);

app.listen(port, async () => {
    console.log(`Admin Server is working on port ${port}`);
    // program runs listen first
    dotenv.config();
    await dbConnet();
});