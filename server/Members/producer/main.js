"use strict";
/* IMPORTS */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { Kafka } = require("kafkajs");

//-------------------------------------------

/* CONFIGS */
//server.server();
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
///////////////////////////////////////////////////////////////

var kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"],
});

app.post("/new_member", (req, res) => {
  (async () => {
      const producer = kafka.producer();
      //const admin = kafka.admin();
      await producer.connect();
      const { name, lastname, dni, mail, patente, premium } = req.body;
      let member = {
        name: name,
        lastname: lastname,
        dni: dni,
        mail: mail,
        patente: patente,
        premium: premium,
      }
      if(member["premium"] == 'si'){
        const topicMessages = [
          {
            // Stock debe estar leyendo constantes consultas
            topic: 'members',
            messages: [{value: JSON.stringify(member), partition: 1}]
          },
          {
              // Stock debe estar leyendo constantes consultas
              topic: 'stock',
              messages: [{value: JSON.stringify(member)}]
          }
        ]
        await producer.sendBatch({ topicMessages })
      }else{
        const topicMessages = [
          {
            // Stock debe estar leyendo constantes consultas
            topic: 'members',
            messages: [{value: JSON.stringify(member), partition: 0}]
          },
          {
              // Stock debe estar leyendo constantes consultas
              topic: 'stock',
              messages: [{value: JSON.stringify(member)}]
          }
        ]
        await producer.sendBatch({ topicMessages })
      }
      

      /*await producer_stock.send({
        topic: "stock",
        //value: JSON.stringify(user)
        messages: [{ value: JSON.stringify(user) }],
      })*/
      await producer.disconnect();
      //await admin.disconnect();
      res.json(member);
      console.log("Miembro registrado");
  })();
});


  ///////////////////////////////////////////////////////////////  


/*app.get("/", (req, res) => {
  res.send("ola api");
});*/


/* PORTS */

app.listen(port,host, () => {
  console.log(`API run in: http://localhost:${port}.`);
});
