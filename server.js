"use strict";

const express = require("express");
const jwt = require('jsonwebtoken');
const cors = require("cors");
const { check } = require('express-validator');
const config = require("./src/config/config");
const { validate_param } = require("./src/middlewares/validation");
const app = express();
const { get_userfirebase } = require('./src/controllers/auth.controller');

app.use(cors());
app.use(express.json());


app.use("/v1/auth", require("./src/routes/auth.routes"));


const conexion = app.listen(config.port, () => {
  console.log("Escuchando en puerto " + config.port);
});


// timpo real
const io = require('socket.io')(conexion,{
  cors: {
      origin : true,
      credentials: true,
      methods : ["GET", "POST"] 
  }
});


app.post('/',[
   check('_token', 'el _token es obligatorio').not().isEmpty(),
   check('_uid', 'el uid es obligatorio').not().isEmpty(),
   //check('_email', 'el uid es obligatorio').not().isEmpty(),
   //check('_suscripcion_type','el _suscripcion_type es obligatorio').not().isEmpty(),
   validate_param
],(req,res) => {

 
  const { _token, _uid} = req.body;
  get_userfirebase(_uid).then(val => {
      if ( val.type ) {
        try {

          jwt.verify( _token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
          const jwtresp = jwt.decode(_token);

          io.emit("rtr",{
              _token: req.body._token,
              user : val.user[0]
          });

          return res.status(200).json({
              ok : true,
              _token : _token,
              resp : jwtresp
          });

        } catch (error) {
            return res.status(401).json({
                ok: false,
                msg: 'Qr no valido, vuelve a generar otro Qr'
            });
        }



      } else if ( !val.type) {
        return res.status(404).json({
            ok : false,
            msg : val.msg
        });
      } else {
        return res.status(500).json({
          ok : false,
          msg : val.msg
        });
      }
  });
  
 

});




/*
io.on("connection",(socket)=>{
  console.log('nuevo usuario conectado');
  socket.on("test",(objeto) => {
     console.log('test' + objeto.texto);
     socket.emit("rtr")
  });
})*/




