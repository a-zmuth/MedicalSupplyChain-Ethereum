const app = require('../SupplyChain-api/src/app.js'); 
const mongoose = require('mongoose');
const { MONGODB_URI, PORT } = process.env;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');

       
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });


function graceful() {
    mongoose.connection.close(function() {
        console.log('MongoDB connection closed due to application termination');
        process.exit(0);
    });
}

process.on('SIGTERM', graceful);
process.on('SIGINT', graceful);