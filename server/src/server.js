// SERVIDOR - EXPRESS


//-----------------------------------------------------------------------------------------------------------------------
//                                             CREACIÓN DEL SERVIDOR CON EXPRESS               
//------------------------------------------------------------------------------------------------------------------------
// EXPRESS --> Creación de servidores y peticiones a rutas
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors'); 


// Para hacer las peticiones desde el front
const { router } = require('./routes/index.js');

//EXPRESS --> Creo el servidor con express y el puerto donde va a estar
const server = express();
const PORT = 3010;

// Para los métodos del POST
server.use(express.json());
server.use(cors());

// Asignando nombre al servidor
// server.name = 'API_VideoGames';




//------------------------------------------------------------------------------------------------------------------------
//                                       CONFIGURACIÓN DEL MIDDLEWARE EN UN SERVIDOR NODE.JS            
//------------------------------------------------------------------------------------------------------------------------
// Estas líneas de código establecen middleware en el servidor Node.js para el análisis de los cuerpos de las solicitudes (Ya sea en formato 'urlencoded' o 'json'), el análisis de cookies y la generación de registros de las solicitudes entrantes. Cada middleware tiene un propósito específico en el procesamiento de las solicitudes HTTP recibidas por el servidor.

// Configura el middleware 'body-parser' para analizar solicitudes entrantes con un tipo de contenido 'application/x-www-form-urlencoded'
// body-parser --> Es una biblioteca que permite analizar el cuerpo de las solicitudes HTTP y extraer los datos enviados desde un formulario HTML. 
// extended: true --> Permite el analisis de objetos anidados y matrices
// limit: 50mb --> establece un límite de tamaño para el cuerpo de la solicitud en 50MB
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Configura el middleware 'body-parser' para analizar solicitudes entrantes con un tipo de contenido 'application/json', esto permite que el servidor pueda manejar y extraer datos en formato JSON enviados en el cuerpo de la solicitud
// limit: 50mb --> establece un límite de tamaño para el cuerpo de la solicitud en 50MB
server.use(bodyParser.json({ limit: '50mb' }));

// Configura el middleware 'cookie-parser' para analizar las cookies en las solicitudes entrantes y facilitar su manipulación 
// cookie-parser --> Es una biblioteca que permite leer y establecer cookies en el servidor
server.use(cookieParser());

// Configura el middleware 'morgan' para generar registros (logs) de las solicitudes HTTP entrantes
// morgan --> Es una biblioteca que facilita el registro de solicitudes y respuestas HTTP
server.use(morgan('dev'));





//------------------------------------------------------------------------------------------------------------------------
//                  CONFIGURACIÓN DEL CORS --> PARA QUE LA RUTA(3011) HAGA PETICIONES DEL LADO DEL FRONT               
//-----------------------------------------------------------------------------------------------------------------------
server.use((req, res, next) => {
  //Autorizo recibir solicitudes de este dominio - Del frontend
  res.header('Access-Control-Allow-Origin', 'http://localhost:3011'); // update to match the domain you will make the request from
  //Autorizo recibir solicitudes que incluyan el encabezado con credenciales
  res.header('Access-Control-Allow-Credentials', 'true');
  //Autorizo recibir solicitudes con dichos hedears
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //Autorizo las solicitudes tipo GET, POST, OPTIONS, PUT y DELETE.
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/drivers', router);





//------------------------------------------------------------------------------------------------------------------------
//                                      CONFIGURACIÓN DEL MIDDLEWARE PARA MANEJO DE ERRORES               
//------------------------------------------------------------------------------------------------------------------------
// Este middleware captura los errores que se roducen en el servidor y envía una respuesta de error al cliente con un código de estado y un mensaje correspondientes. Además, muestra el error en la consola del servidor para fines de registro y seguimiento

// Error catching endware.
// Define un middleware en el servidor utilizando la función 'use()' de EXPRESS. El middleware se ejecutará cuando se produzca un error durante el procesamiento de una solicitud.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars

  // Define la variable 'status' que representa el código de estado HTTP que se enviará en la respuesta. El valor se tomará del objeto 'err' si tiene una propiedad 'status', de lo contrario, se establecerá en 500(Internal Server Error)
  const status = err.status || 500;

  // Define la variable 'message' que representa el mensaje de error que se enviará en la respuesta. El valor se tomará de la propiedad 'message' del objeto 'err' si está definida, de lo ocntrario, se tomará el objeto 'err' directamente.
  const message = err.message || err;

  // Muestra el error en la consola del servidor
  console.error(err);

  // Envía una respuesta HTTP al cliente con el código de estado 'status' y el mensaje de error 'message'. La respuesta se envía utilizando los métodos 'status()' y 'send()' de la respuesta 'res' del servidor.
  res.status(status).send(message);
});

module.exports = server;
