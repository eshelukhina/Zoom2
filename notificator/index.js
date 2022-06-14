const MicroMQ = require('micromq');
const {WebSocketServer} = require('ws');
const axios = require('axios');
require('dotenv').config();

let uid = 0
const connectionsList = new Map()

const app = new MicroMQ({
  name: 'notifications',
  rabbit: {
    url: process.env.RABBIT_URL,
  },
});

const ws = new WebSocketServer({
  port: process.env.PORT
});

ws.on('connection', (connection) => {

    const userId = uid
    uid += 1
    connectionsList.set(userId, connection)
    console.log("Add connection")

  connection.on('message', (message) => {

      console.log("on message")
      console.log(message.toString())

    const { event, data } = JSON.parse(message.toString())

      console.log(event, data)

    switch(event){
        case 'authorize':
            connection.sendUTF(userId)
        case 'getVideos':
            console.log(`GET /videos ${data.folderId}`)
            axios.post(process.env.DISPATCHER_URL, {to: 'gdrive /videos/:folderId', folderId: data.folderId, userId: userId}).then((res) => {
                console.log(res.data)
                connection.send(JSON.stringify(res.data))
            }, (err) => {
                console.log(err)
            })
        case 'cutVideo':
            return //TODO
        default:
            return
    }
  })

  connection.on('close', (code, reason) => {
      console.log("Connection close")
      connectionsList.delete(userId)
  })
})

ws.on('close', (code, reason) => {
    connectionsList.clear()
    console.log('close')
});

app.action('notify', (meta) => {

  if (!meta.userId || !meta.text) {
    return [400, { error: 'Bad data' }]
  }

  const connection = connectionsList[meta.userId]

  if (!connection) {
    return [404, { error: 'User not found' }]
  }

  connection.send(meta.text)

  return { ok: true }

})

app.start()