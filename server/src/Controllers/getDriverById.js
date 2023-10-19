// CONTROLADOR
// Obtiene el detalle de un driver específico

// EXPRESS --> Es un framework web para NODE.JS 
// ASYNC AWAIT

const axios = require('axios');

const url = 'http://localhost:5000/drivers/';

// Request --> Realiza solicitudes HTTP al servidor
// Response --> Envía las respuestas al cliente

// Esta función hace una request a la API local y obtiene el detalle de un driver según el id que viene por params
const getDriverById = async (req, res) => {

    //const id = 1;
    const { id } = req.params;
    console.log('============================================');
    console.log('Solicitaron el driver con el id --> ' + id);

    try {
        // Petición asincrónica a la API local buscando un id en particular
        const datosPeticion = await axios(`${url}${id}`)
        const driverApi = datosPeticion.data;

        // En caso de que sea exitosa la petición me traigo un objeto con los parametros que necesito
        let driver = {
            id: driverApi.id,
            name: driverApi.name.forename,
            lastName: driverApi.name.surname,
            nationality: driverApi.nationality,
            image: driverApi.image.url,
            description: driverApi.description,
            Birthdate: driverApi.dob,
            teams: driverApi.teams
        }

        //console.log(driver);
        res.status(200).send(driver);
        console.log('============================================');       
    }
    
    catch (error) {
        // Responder directamente en la ruta un mensaje 404 de error
        return {error: error.message}
    }
}

//getDriverById();

// NODE JS
module.exports = getDriverById;