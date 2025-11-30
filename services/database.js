// services/database.js
const mongoose = require('mongoose');
const Data = require('../models/dataModel');

const connectDB = async () => {
    const connection_string = process.env.MONGO_URI;
    await mongoose.connect(`${connection_string}`);
    console.log(`[ACQUIRE DB] Conexion exitosa con la DB en ${connection_string}`)
};

const saveData = async (data) => {
    const newData = Data(data);
    const saved = await newData.save();
    console.log('[ACQUIRE DB] Datos guardados con éxito en la DB');
    return saved;
};

const getData = async (id) => {
    const data = Data.findById(id);
    return data;
}

module.exports = {
    connectDB,
    saveData,
    getData
};

