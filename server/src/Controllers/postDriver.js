// CONTROLADOR
// Creación de un videoGame

// EXPRESS --> Es un framework web para NODE.JS 
// ASYNC AWAIT

// SEQUELIZE --> Requiero conectarme con la BD con e modelo "Favorite"
const { Drivers } = require('../db.js');

// Request --> Realiza solicitudes HTTP al servidor
// Response --> Envía las respuestas al cliente
const postDriver = async (req, res) => {

    const driver1 = {
        name: 'Daniel',
        lastName: 'Espinal',
        description: 'Ejercicio de descripción',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Lance_Reventlow_and_actress_Cheryl_Holdridge_wedding_portrait%2C_Calif.%2C_1964.jpg/800px-Lance_Reventlow_and_actress_Cheryl_Holdridge_wedding_portrait%2C_Calif.%2C_1964.jpg',
        nationality: 'Colombiano',
        birthdate: '17/04/1995',
    };

    try {
        //const { id, name, lastName, nationality, image, description, birthdate, team } = req.body;

        // Sin por lo menos no existe algunos de los campos del modelo devuelve un mensaje
        if(!driver1.id || !driver1.name || !driver1.lastName || !driver1.description || !driver1.image || !driver1.nationality || !driver1.birthdate) {
            return res.status(404).json({message: 'Faltan datos por completar'});
        }

        else {
            //const newDriver = await Drivers.create({driver1})
            await Drivers.create({driver1})


            console.log("Se registró el driver en la BD correctamente el Driver: " + driver1.name);
            console.log('=================================================================================');
            return res.status(200).json(driver1)
        }
        
        // else {
        //     const newDriver = await Drivers.create({
        //         id,
        //         name,
        //         lastName,
        //         nationality,
        //         image,
        //         description,
        //         birthdate,
        //         team
        //     })

        //     return res.status(200).json(newDriver)
        // }
    }
    catch(error) {
        //return res.status(404).json({message: error.message})
        console.log('¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ');
        console.log('No se pudo registrar el Driver');
        console.log('¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ¡ ');
        return {error: error.message};
    }
}

postDriver();

// NODE JS
module.exports = postDriver;
