// CONTROLADOR
// Obtiene el detalle de un driver específico

// EXPRESS --> Es un framework web para NODE.JS 
// ASYNC AWAIT

const axios = require('axios');

//const url = 'http://localhost:5000/drivers?name.forename=';
const url = 'http://localhost:5000/drivers';

// Request --> Realiza solicitudes HTTP al servidor
// Response --> Envía las respuestas al cliente

// Esta función hace una request a la API local y obtiene los drivers que contengan el name que llega por params 
const getDriverByName = async (req, res) => {

    const { name } = req.params;
    //const name = 'IS';
    console.log('==============================================');
    console.log('Solicitaron el driver con la palabra --> ' + name);

    try {
        //const datosPeticion = await axios(`${url}${name}`)
        const datosPeticion = await axios.get(`${url}`);

        const allDrivers = datosPeticion.data.map(driver => {
            return {
                name: driver.name.forename,
                image : driver.image.url,
                teams : driver.teams
            }
        });

        // Expresión regular para realizar la búsqueda
        const regex = new RegExp(name, 'i'); // 'i' indica case-insensitive

        // Filtra los conductores cuyo forename coincide con la expresión regular
        const filteredDrivers = allDrivers.filter(driver => 
            regex.test(driver.name)
        );
        
        // Solo necesito los primeros quince drivers
        const quinceDrivers = filteredDrivers.slice(0, 15);

        //console.log(quinceDrivers);

        res.status(200).send(quinceDrivers);
        console.log('==============================================');

    } catch (error) {
        // Responder directamente en la ruta un mensaje 404 de error
        return {error: error.message}
    }
}

//getDriverByName();

module.exports = getDriverByName;
