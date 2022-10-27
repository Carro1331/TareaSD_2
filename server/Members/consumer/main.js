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

const consumer = kafka.consumer({ groupId: "members" });

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
var members = [];

const main = async () => {
  console.log("Entra main")
  
  await consumer.connect();
  await consumer.subscribe({ topic: "members", fromBeginning: true });
  
  console.log("producer");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      //value = message.value
      var miembro = JSON.parse(message.value.toString());
      console.log(miembro)

    },
  })
}
      /*a = value.toString()
      members.push(a)
      console.log(members)
    },
  })
  .catch(console.error)
};

//asdlaskdj
app.get('/members', (req, res) => {
  res.send(members)
})
/* PORTS */

app.listen(port,host,()=>{
    console.log(`Registro de miembros in: http://localhost:${port}.`)
    main()
});