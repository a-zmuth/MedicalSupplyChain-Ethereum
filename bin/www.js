const app = require('../SupplyChain-api/src/app.js');
const mongoose = require('../SupplyChain-api/src/config/mongoose');
const port = require('../SupplyChain-api/src/config/').port;

// Start the server after connecting to the database
mongoose.connection.on('connected', function() {
    app.listen(port, () => {
        console.log(
            `Server started on port ${port}`);
    });
});

// Handle graceful shutdown
function graceful() {
    mongoose.connection.close(function() {
        process.exit(0);
    })
}

process.on('SIGTERM', graceful);
process.on('SIGINT', graceful);
