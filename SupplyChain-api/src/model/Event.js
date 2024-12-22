const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = Schema({
    index: {type: Number},
    supplier: {type: String},
    deliveryCompany: {type: String},
    customer: {type: String},
    status: { type: Number},
});

module.exports = mongoose.model('Event', EventSchema);