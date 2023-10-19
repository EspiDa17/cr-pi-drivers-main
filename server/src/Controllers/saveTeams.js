const getTeams = require("./getTeams.js");
const { Teams } = require('../db.js');


const saveTeams = async () => {
    try {
        
        const allTeams = await getTeams();

        // Convierto este arreglo en un arreglo de objetos con la key name 
        const allTeams1 = allTeams.map(team => ({ name: team}));

        // Método asíncrono
        // bulkCreate --> Agrega allTeams1 al modelo Teams de la BD
        await Teams.bulkCreate(allTeams1);
        console.log('Se guardaron los Teams en la BD');
        console.log('=================================================================================');


    } 
    catch (error) {
        console.log('¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ');
        console.log('Hubo un problema al cargar en la BD');
        console.log('¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ');
        return {error: error.message};
    }
}

// NODE JS
module.exports = {
    saveTeams
};