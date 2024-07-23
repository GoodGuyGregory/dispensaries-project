const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DispensarySchema = new Schema({
    Address1: {
        type: String
    },
    Address2: {
        type: String
    },
    City: {
        type: String
    },
    Country: {
        type: String
    },
    Region: {
        type: String
    },
    Description: {
        type: String
    },
    Email: {
        type: String
    },
    Image: {
        type: String
    },
    Name: {
        type: String
    },
    Phone: {
        type: String
    },
    PostalCode: {
        type: String
    },
    PrimaryLocation: {
        type: Object
    },
    Rating: {
        type: String
    },
    Schedule: {
        type: String
    },
    Website: {
        type: String
    },
    Menu: {
        type: String ,
        default: "[]"
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
    coordinates: {
        type: [Number],
        required: true
    }
    }
});

// Create a 2dsphere index on the location field
DispensarySchema.index({ location: '2dsphere' });

const Dispensary = mongoose.model('Dispensary', DispensarySchema);

module.exports = Dispensary;