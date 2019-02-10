// instalamos node en nuestro proyecto 
// npm init --yes
// instalamos framework express
// npm install express




// importamos express
const express = require('express');
const socketio = require('socket.io');
const http = require('http'); // módulo de node para crear servidores
const app = express(); // servidor a traves de express 
const server = http.createServer(app); // creará servidor a traves de node
const path = require('path');



// constante de node q nos da la ruta del directorio 
/* __dirname */

//path.join(__dirname, 'public');



app.use(express.static(path.join(__dirname, 'public'))); //archivos staticos, los q no van a cambiar
// archivo q mostrará cuando nos conectemos
//como dentro d ela carpeta tenemos un index.html lo ejecutará


// funcionalidad de tiempo real gracias a los websockets
//instalar modulo de socket.io
// en una app normal el cliente manda petición al servidor y este respode y la conexión se cierra pero en un chat necesitamos q el servidor esté escuchando continuamente para ello necesitamos ls websockets
//  npm install socket.io
//para q funcione el socket necesita hacerlo sobre un servidor

// con este servidor creado se lo puedo pasar a socket para que esté escuchando continuamente, es decir en tiempo real 
const io = socketio.listen(server);//enviar datos del el cliente y del servidor

// settings
// cuando subimos nuetsra app a produccion xq en servidores aws o heroku ns dan un puerto concreto para hacer q coja el puerto del SSOO dnd se ejecuta la app hacemos:
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);
/* 
durante el  proyecto tenemos q hacer varias pruebas lo q implica desconectar y volver a conectar el servidor para evitarnos eso instalamos un módulo de nodeJS nodemon (npm install nodemon -D) lo instalamos con -D mayúscula para q no lo incluya como una dependencia necesaria para el proyecto ) que reinicia el servidor automáticamente cuando guardamos cambios modificamos la línea de script en el package.json y le damos un alias dev; para ejecutar el script es npm run dev 

*/


// encendemos servidor y listen en el puerto 3000

// con get.PORT cogemos el puerto fijado
server.listen(app.get('port'), ()=>{
    console.log('server on port ' + app.get('port'));
    
});
// para probar que funciona el servidor en el puesto 3000
// node app.js (en el terminal)  o localhost:3000 (navegador) pero antes tenemos q enviar un archivo al servidor para q lo muestre en pantalla cuando un usuario acceda sino dará error
// creamos carpeta public y dentro ponemos el archivo index.html 

