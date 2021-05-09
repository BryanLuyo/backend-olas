'use strict'

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http,{
    cors: {
        origin : true,
        credentials: true,
        methods : ["GET", "POST"] 
    }
});

io.on("connection",(socket)=>{
    console.log('nuevo usuario conectado');
    socket.on("test",(objeto) => {
       console.log('test' + objeto.texto);
       socket.emit("rtr")
    });
})

app.get('/',(req,res) => {
   res.send('hola mundo');
});

http.listen(3000,() => {
    console.log("Escuchando en puerto 3000");
})
