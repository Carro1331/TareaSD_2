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
const consumer = kafka.consumer({ groupId: "group-members" });


//kafka
/*var consumer = new Kafka.KafkaConsumer({
'group.id': 'kafka',
'metadata.broker.list': 'elkafka:9092',
}, {});

consumer.connect();
consumer.on('ready', () => {
    console.log('consumer ready..')
    consumer.subscribe(['test']);
    consumer.consume();
  }).on('data', function(data) {
    console.log(`received message: ${eventType.fromBuffer(data.value)}`);
  });
global.consumer = consumer;*/
/* VARIABLES */


//app.use(require('./api/find'))

/*app.get('/member_list', (req, res) => {
  res.send('Member list')
  main();
})*/

var value = null
var json = {}
var registro = {};
var members = [];

const main = async () => {
  console.log("Entra main")
  await consumer.connect();
  await consumer.subscribe({ topic: "members", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      value = message.value
      //console.log({
      //  value: message.value.toString(),
      //})
      json = JSON.parse(value)
      console.log(members.length + 1,"Miembro Registrado recientemente:")
      console.log(json)
      if(members.includes(json)){
        console.log("????")
      }else{
        console.log("Miembros -> ",members)
        members.push(json)
        console.log("Once has been pushed, ", members)
      }
    },
  })
//  .catch(console.error)
};

//asdlaskdj
app.get('/blocked', (req, res) => {
  res.send(members)
})
/* PORTS */

app.listen(port,host,()=>{
    console.log(`API-Blocked run in: http://localhost:${port}.`)
    main()
});