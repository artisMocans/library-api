const mongoose = require('mongoose');

async function connect(uri) {
    if (!uri) throw new Error('MONGO_URI is not set');
    mongoose.set('strictQuery', true);

    await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
        appName: 'library-api'
    });

    mongoose.connection.on('error', (err) => {
        console.error('Mongo connection error:', err);
    });

    console.log(`Successfully connected to MongoDB at ${mongoose.connection.host}:${mongoose.connection.port}`);
}

module.exports = {connect};
