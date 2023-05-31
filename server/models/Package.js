const mongoose = require('mongoose')

const PackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    no_of_places:{
        type: Number,
        required: true,
    },
    places: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    phoneno:{
        type: Number,
        required: true,
    },
    id:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true, 
    },
});

module.exports = mongoose.model("Packages",PackageSchema)