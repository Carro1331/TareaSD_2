const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'Sopaipilla',
  brokers: ['localhost:9092'],
})

  const producer = kafka.producer()
  await producer.connect()
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'FUNCIONA ESTAWEAAAA!' },
    ],
  })
  //await producer.disconnect()

  const consumer = kafka.consumer({ groupId: 'test-group' })
  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      })
    },
  })


