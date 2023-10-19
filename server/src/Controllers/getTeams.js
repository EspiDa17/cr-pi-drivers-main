// CONTROLADOR
// Obtiene un arreglo con todos los teams existentes de la API

// EXPRESS --> Es un framework web para NODE.JS 
// ASYNC AWAIT

const axios = require('axios');

const url = 'http://localhost:5000/drivers';

// Request --> Realiza solicitudes HTTP al servidor
// Response --> Envía las respuestas al cliente

// Esta función hace una request a la API de VideoGames y obtiene los primeros 100 VG
const getTeams = async () => {

    console.log('Se solicitaron todos los Teams');
    console.log('=================================================================================');


    try {
        // Variable para almacenar los 100 personajes que treremos de la API
        let allData = [];

        const datosPeticion = await axios(`${url}`)
        allData.push(datosPeticion);

        // .data.results --> Necesito acceder hasta acá para acceder a la info que necesito de cada caracter
        // map --> Solo necesito traerme 7 propiedades de los personajes
        let allTeams1 = allData.map(response => response.data.map(driver => {
            return {
                name : driver.teams
            }
        }))

        // Como en el momento me está llegando un arreglo dentro de otro arreglo
        // Necesito que todos los objetos me queden en un solo arreglo
        // .flat --> Si hay varios arreglos anidados los saca a un solo arreglo
        let allTeams2 = allTeams1.flat();

        const equipos = [];

        allTeams2.forEach(item => {
            equipos.push(item.name);
        });
        
        // Filtrar los elementos que sean diferentes a 'undefined'
        const equiposDefinidos = equipos.filter(equipo => equipo !== undefined);
                
        // Separo cada elemento de los arreglos por comas ','
        const equiposSeparados = equiposDefinidos.map(cadena => cadena.split(',').map(equipo => equipo.trim()));
                
        // Concateno todos los arreglos para que me queden en uno solo
        const equiposPlanos = [].concat(...equiposSeparados);
        
        // Elimino los elementos del arreglo que estén repetidos
        const equiposUnicos = Array.from(new Set(equiposPlanos));
        
        // Ordeno los elementos en orden alfabético
        const equiposOrdenados = equiposUnicos.sort();

        return equiposOrdenados;
        //res.status(200).send(equiposOrdenados);
        //console.log(equiposOrdenados);    
        // console.log('');
        // console.log('Hay ' + equiposOrdenados.length + ' Equipos');
        // console.log(''); 
    }
    
    catch (error) {
        // Responder directamente en la ruta un mensaje 404 de error
        return {error: error.message}
    }
}

//getTeams();

// NODE JS
module.exports = getTeams;