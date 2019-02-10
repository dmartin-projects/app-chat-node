

// CONEXIÓN DEL SOCKET DEL SERVIDOR

module.exports = function(io){
    
    let nicknames = []; // un array q contendrá los users, simulando bbdd
    
    io.on('connection', socket => { // la función socket cuando se conecte un nuevo usuario ejecuta la función
        console.log('nuevo user conectado');
        
        socket.on('new user', (data, callback) =>{ // el servidor escucha lo q manda el cliente con la llave new user y recibe datos data y una función (callback) q espera una respuesta
            
            
            if(nicknames.indexOf(data)!=-1){ //ya existe el usuario
                callback(false);
                
                
            }else{
                callback(true); // el usuario no existe en la bbdd y lo agregams
                socket.nickname = data; // la conexión socket es como un objeto q le podemos dar propiedades, en este caso le agrego la propiedad nickname
             
                
                nicknames.push(socket.nickname);
            

                io.sockets.emit('usernames',nicknames);//actualizamos los nombres de usuarios

            }

        })

        socket.on('send message', data => { // captura lo q manda socket.emit() del cliente  y lo almacena en data y lo podemos ver en la consola del servidor no la del navegador
            io.sockets.emit('new message',{
                msg: data,
                nick: socket.nickname
            });
            
        });

        socket.on('disconnect', data =>{
           
            
            if(!socket.nickname){
                return;
            }else{

                nicknames.splice(nicknames.indexOf(socket.nickname), 1);
                io.sockets.emit('usernames', nicknames);
            } 
       
            


        })

      
    
    })


}