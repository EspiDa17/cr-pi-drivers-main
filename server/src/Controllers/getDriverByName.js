// CONTROLADOR
// Obtiene el detalle de un driver específico

// EXPRESS --> Es un framework web para NODE.JS 
// ASYNC AWAIT

const axios = require('axios');

const url = 'http://localhost:5000/drivers?name.forename=';

// Request --> Realiza solicitudes HTTP al servidor
// Response --> Envía las respuestas al cliente

// Esta función hace una request a la API local y obtiene el detalle de un driver según el name que viene por params
const getDriverByName = async (req, res) => {

    //const { name } = req.params;
    const name = 'Le';
    console.log('==============================================');
    console.log('Solicitaron el driver con el nombre --> ' + name);

    try {
        // Variable para almacenar los drivers encontrados con ese name
        let allDriversName = [];

        // Petición asincrónica a la API local buscando un id en particular
        const datosPeticion = await axios(`${url}${name}`)
        allDriversName.push(datosPeticion);

        // .data.results --> Necesito acceder hasta acá para acceder a la info que necesito de cada caracter
        // map --> Solo necesito traerme 7 propiedades de los personajes
        let allDriversName1 = allDriversName.map(response => response.data.map(driver => {
            return {
                name: driver.name.forename,
                image : driver.image.url,
                teams : driver.teams
            }
        }))

        // Como en el momento me está llegando un arreglo dentro de otro arreglo
        // Necesito que todos los objetos me queden en un solo arreglo
        // .flat --> Si hay varios arreglos anidados los saca a un solo arreglo
        let allDriversName2 = allDriversName1.flat();

        //console.log(allDriversName2);
        res.status(200).send(allDriversName2);
        console.log('==============================================');       
    }
    
    catch (error) {
        // Responder directamente en la ruta un mensaje 404 de error
        return {error: error.message}
    }
}

//getDriverByName();

// NODE JS
module.exports = getDriverByName;