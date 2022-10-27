'use strict';
/* IMPORTS */
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const { Kafka } = require("kafkajs");

//-------------------------------------------

/* CONFIGS */
//server.server();
const app = express()
dotenv.config()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(cors())

var port = process.env.PORT || 8000;
var host = process.env.PORT || '0.0.0.0';

var kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"],
});
const consumer = kafka.consumer({ groupId: "group-ubication" });



var value = null
var json = {}
var stock = []
//var registro = {};
const main = async () => {
  console.log("Entra Ubication")
  await consumer.connect();
  await consumer.subscribe({ topic: "ubication", fromBeginning: true });
  console.log("consumer");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      value = message.value
      var algo = JSON.parse(message.value.toString());
      console.log(algo)
      json = JSON.parse(value)
    },
  })
  .catch(console.error)
};

app.get('/blocked', (req, res) => {
  res.send(bloqueados)
})
/* PORTS */

app.listen(port,host,()=>{
    console.log(`API-Blocked run in: http://localhost:${port}.`)
    main()
});