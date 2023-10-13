// CONTROLADOR
// Obtiene un arreglo de objetos, donde cada objeto es un driver con su información

// EXPRESS --> Es un framework web para NODE.JS 
// ASYNC AWAIT

const axios = require('axios');

const url = 'http://localhost:5000/drivers';

// Request --> Realiza solicitudes HTTP al servidor
// Response --> Envía las respuestas al cliente

// Esta función hace una request a la API de VideoGames y obtiene los primeros 100 VG
const getDrivers = async () => {

    console.log('Se solicitaron todos los drivers');

    try {
        // Variable para almacenar los 100 personajes que treremos de la API
        let allDrivers = [];

        const datosPeticion = await axios(`${url}`)
        allDrivers.push(datosPeticion);

        // .data.results --> Necesito acceder hasta acá para acceder a la info que necesito de cada caracter
        // map --> Solo necesito traerme 7 propiedades de los personajes
        let allDriver1 = allDrivers.map(response => response.data.map(driver => {
            return {
                name: driver.name.forename,
                image : driver.image.url,
                teams : driver.teams
            }
        }))

        // Como en el momento me está llegando un arreglo dentro de otro arreglo
        // Necesito que todos los objetos me queden en un solo arreglo
        // .flat --> Si hay varios arreglos anidados los saca a un solo arreglo
        let allDriver2 = allDriver1.flat();

        res.status(200).send(allDriver2);
        //console.log(allDriver2);       
    }
    
    catch (error) {
        // Responder directamente en la ruta un mensaje 404 de error
        return {error: error.message}
    }
}

//getDrivers();

// NODE JS
module.exports = getDrivers;