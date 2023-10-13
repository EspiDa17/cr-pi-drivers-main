//---------------------------------------------------------------------------------------------------------------------
//                                       CONEXIÓN CON LA BD Y EL TRABAJO DE SEQUELIZE
//-----------------------------------------------------------------------------------------------------------------------

// Requerir lo que tenemos en nuestro archivo .env
require("dotenv").config();

// Nos traemos a sequelize
const { Sequelize } = require("sequelize");

// Módulo que se utiliza para interactuar con el sistema de archivos local, como leer y escribir archivos
const fs = require('fs');

// Módulo se utiliza para trabajar con rutas de archivos y directorios
const path = require('path');

// Nos traemos las variables de entorno de nuestro archivo .env
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// Creo la instancia de sequelize para tener la conexión
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/drivers`, {
  // Para que no me muestre en la consola a la hora de crear o modificar en la BD
  logging: false, 
  native: false, 
});





//----------------------------------------------------------------------------------------------------------------------
//                                              IMPORTAR LOS MODELOS Y LOS CREA EN LA BD
//----------------------------------------------------------------------------------------------------------------------
// Almaceno el nombre del archivo actulal en la variable basename--> db.js
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
// fs.readdirSync --> Función sincrónica para leer y obtener la lista de archivos y directorios contenidos en un directorio ('/models')
fs.readdirSync(path.join(__dirname, '/models'))

.filter((file) => 
  (file.indexOf('.') !== 0) &&   //Verifica si el nombre del archivo no comienza con punto '.'
  (file !== basename) &&         // Verifica si el nombre el archivo no es igual a lo que hay en la variable 'basename'
  (file.slice(-3) === '.js'))    // Verifica que los tres últimos caracteres son igual a '.js'


// Requiere y agrega los archivos encontrados a el array 'modelDefiners'
// __dirname   -->   C:\Users\Daniel\Desktop\Henry\BootCamp\PI\Cohorte 14b\RepoV1\cr-pi-drivers-main\server\src
// file        -->   Driver.js y Team.js
.forEach((file) => {
  modelDefiners.push(require(path.join(__dirname, '/models', file)));
});

// Inyectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));





//----------------------------------------------------------------------------------------------------------------------
//          SE CAPITALIZA LA PRIMERA LETRA DE CADA CLAVE Y SE CREA UN NUEVO OBJETO CON LAS CLAVES MODIFICADAS
//------------------------------------------------------------------------------------------------------------------------
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Drivers } = sequelize.models;
const { Teams } = sequelize.models;




//----------------------------------------------------------------------------------------------------------------------
//                                                   RELACIÓN ENTRE LOS MODELOS
//----------------------------------------------------------------------------------------------------------------------
// Product.hasMany(Reviews);
Drivers.belongsToMany(Teams,{ through: 'Driver_Team'})
Teams.belongsToMany(Drivers,{through:'Driver_Team'});




module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};