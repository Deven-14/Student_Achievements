import dotenv from "dotenv";
import dbConnet from "./src/config/database.js";
import express from "express";
import { authRouter } from "./src/routes/index.js";
dotenv.config();
dbConnet();

const port = process.env.PORT || 3000;
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
    res.send("Working, In Authorization Server");
});

app.use("/api/auth", authRouter);

app.listen(port, () => {
    console.log(`Authorization Server is working on port ${port}`);
});

