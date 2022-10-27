"use strict";
/* IMPORTS */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { Kafka } = require("kafkajs");
const { json } = require("body-parser");

//-------------------------------------------

const app = express();
dotenv.config();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 3000;
var host = process.env.PORT || '0.0.0.0';

var value = null
var kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"],
});

app.post("/ubication", (req, res) => {
  console.log("Ubication");
  (async () => {
      const producer = kafka.producer();
      //const admin = kafka.admin();
      await producer.connect();
      const { id,coordenadas , denuncia } = req.body;
      var time = Math.floor(new Date() / 1000);
      let ubication = {
        id: id,
        coordenadas:coordenadas,
        denuncia:denuncia ,
        tiempo: time.toString()
      }
      value = JSON.stringify(ubication)

      if(ubication["denuncia"] == 1){
        console.log("Este carrito ha sido denunciado, es profugo")

         const CarroProfugo = [{
            topic: 'ubication',
            partition:1,
            messages:[{value:JSON.stringify(ubication),partition : 1}]
          }
        ]
        await producer.sendBatch(CarroProfugo)
      }
      else{
        console.log("Carrito Limpio.")

         const CarroProfugo = [{
          //Partition 3 para carros no profugos
          topic: 'ubication',
          partition:0,
          messages:[{value:JSON.stringify(ubication),partition: 0}]
          }
        ]
        await producer.sendBatch({CarroProfugo})
      }
      await producer.disconnect();
      res.json(ubication);
  })();
});



  ///////////////////////////////////////////////////////////////  

/* PORTS */

app.listen(port,host, () => {
  console.log(`API run in: http://localhost:${port}.`);
});
