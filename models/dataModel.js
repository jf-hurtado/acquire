const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const data = new Schema ({
    features: {
        0: Number,
        1: Number,
        2: Number,
        3: Number,
        4: Number,
        5: Number,
        6: Number
    },
    featureCount: Number,
    scalerVersion: String,
    targetDate: Date,
    dailyValues: {
        0: Number,
        1: Number,
        2: Number
    },
    kunnaMeta: {
        alias: String,
        name: String,
        daysUsed: {
            0: Date,
            1: Date,
            2: Date
        }
    },
    fetchMeta: {
        timeStart: Date,
        timeEnd: Date    
    },
    source: String
}, {
    timestamp: true
});

const Data = model('Data', data);
module.export = Data;
