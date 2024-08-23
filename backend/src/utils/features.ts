import mongoose from "mongoose"


export const connectDB = () => {
    mongoose.connect('mongodb://127.0.0.1:27017', {
        dbName:"E-commerce-TS"
    }).then((c) => {
        console.log(`Db Connected to ${c.connection.host}`);
    }).catch((err) => console.log(err))
}