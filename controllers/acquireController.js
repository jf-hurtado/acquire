// controllers/acquireController.js
const database = require('../services/database');
const { getDataKunna } = require('../services/kunnaDataAcquisition');

const health = (req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'acquire'
    });
};

// Como no se pasa body no sé cual va a ser la fecha objetivo, es decir,
// si se va a poder pasar la fecha objetivo por parámetro para hacer la
// obtención de datos de un día concreto que no sea para hoy o mañana 
const data = async (req, res) => {    
    try {
        const apiData = getDataKunna();
        res.status(200).json({
            message: 'Datos obtenidos con exito',
            data: apiData
        });

    } catch(err) {
        console.error('[ACQUIRE DATA] ERROR al obtener datos de Kunna', err);
        res.status(500).json({error: 'Error interno en el servidor'});
    }
    
};


module.exports = { 
    health,
    data
}

