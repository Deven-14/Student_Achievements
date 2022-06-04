import mongoose from "mongoose";
const { connect } = mongoose;

export async function dbConnect() {

    await connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    });

}

//   useCreateIndex: true,
//   useFindAndModify: false,