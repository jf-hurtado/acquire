// services/database.js

const mongoose = require('mongoose');

const connectDB = async () => {
    const connection_string = process.env.MONGO_URI;
    await mongoose.connect(`${connection_string}`);
    console.log(`[ACQUIRE DB] Conexion exitosa con la DB en ${connection_string}`)
};

module.exports = {
    connectDB
}

