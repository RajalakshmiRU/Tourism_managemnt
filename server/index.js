const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRouter = require('./router/Users')
const packageRouter = require('./router/Package')
// This is your test secret API key.
const stripe = require('stripe')('sk_test_51NCyqySA3sos8SeuNNgcJUJF4XUkBFr4GPu9dSDmZKAhCDSLZqECjrA6SZ4k41hlzPiF21YIgwk4NQ8VcOBU9tVz00qPRiSeUH');
const app = express();
app.use("/uploads",express.static("./uploads"))
app.use(express.static('public'));
app.use(cors());


const PORT = 3001


app.listen(PORT, () => {
    console.log("Server runs perfectly!");
})

async function connect() {
    try{
        await mongoose.connect(
            "mongodb+srv://Raji:Raji20@tourism-management.kpaevim.mongodb.net/Tourism_Management?retryWrites=true&w=majority"
            );
        console.log(`Connected to Mongo DB`)
    }
    catch (error)
    {
        console.log(`Error -> ${error}`)
    }
}

connect()
app.use('/users',userRouter)
app.use('/packages',packageRouter)