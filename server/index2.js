const express = require('express');
const global_data = require('./src/auth/global_data');
const studentRouter = require('./src/routes/student_router');


const port = process.env.PORT || 3000;
const app = express();
app.locals.departments = global_data.all_departments;
// require('dotenv').config({ path: './server/.env' }); // path from the root of the module
app.locals.dotenv = require('dotenv');
app.locals.dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// http to https
app.enable('trust proxy');
app.use((req, res, next) => {
    //console.log(req.headers.host);
    if(req.headers.host != "localhost:3000") {
        req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
    } else {
        next();
    }
});

app.use("/student", studentRouter);

// trial, remove this later
app.post("/verify_lecturer", async(req, res) => {
    try {

        var userData = {
            name: null,
            image: null,
            email: null
        };

        userData.name = req.body.name;
        userData.email = req.body.email;
        userData.image = req.body.image;
        await is_lecturer(userData.email);
        res.send(userData);

    } catch (error) {
        console.log(error);
        res.send({ error: 'Not a lecturer' });
    }
});


app.listen(port, () => {
    console.log(`this log is working on ${port}`);
});