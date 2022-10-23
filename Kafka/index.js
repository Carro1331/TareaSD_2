const { Kafka } = require('kafkajs')
const producer = kafka.producer()


const main = async () => { 

const kafka = new Kafka({
  clientId: 'Cliente',
  brokers: ['localhost:9092'],
})

await producer.connect()
await producer.send({
  topic: 'test-topic',
  messages: [
    { value: 'Si funciona CTMRE!' },
  ],
})

await producer.disconnect()
}

main();