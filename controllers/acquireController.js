// controllers/acquireController.js
const database = require('../services/database');

const health = (req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'acquire'
    });
};

const getDates = () => {
    const now = new Date();

    const options = { 
        timeZone: 'Europe/Madrid', 
        hour: '2-digit',       
        hour12: false          
    };
    
    const madridHourString = now.toLocaleString('es-ES', options);
    const madridHour = parseInt(madridHourString);

    let targetDate = new Date(now);

    if (madridHour >= 23){
        targetDate.setDate(now.getDate() + 1);
    }
    console.log(`[ACQUIRE DATE] La fecha objetivo es ${targetDate.toLocaleDateString()}`);

    const endDate = new Date(targetDate);
    endDate.setDate(targetDate.getDate() - 1);
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 3);

    const startDateForApi = startDate.toISOString().split('.')[0] + 'Z';
    const endDateForApi = endDate.toISOString().split('.')[0] + 'Z';

    return {startDateForApi, endDateForApi};
};

// Como no se pasa body no sé cual va a ser la fecha objetivo, es decir,
// si se va a poder pasar la fecha objetivo por parámetro para hacer la
// obtención de datos de un día concreto que no sea para hoy o mañana 
const data = async (req, res) => {
    const { startDateForApi, endDateForApi } = getDates();

    console.log(startDateForApi, endDateForApi);

    headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.KUNNA_API_KEY}`
    }

    body = {
            "time_start": startDateForApi,
            "time_end": endDateForApi,

                "filters": [
                {
                "filter": "name",
                "values": [
                    "1d"
                ]
                }, {"filter": "uid",
                "values": [
                    "MLU00360002"
                ]
                }
            ],

            "limit": 100,
            "count": false,
            "order": "DESC"
            }
    
    try {
        const response = await fetch(process.env.KUNNA_URL, {
            method: 'POST',
            headers: headers, 
            body: JSON.stringify(body),
        });

        if(!response.ok) {
            const errorBody = await response.text();
            throw new Error(`${response.status} ${response.statusText} - ${errorBody}`);
        }

        const apiData = await response.json();
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

