const MicroMQ = require('micromq');
const WebSocket = require('ws');
const axios = require('axios');
require('dotenv').config();

const app = new MicroMQ({
  name: 'notifications',
  rabbit: {
    url: process.env.RABBIT_URL,
  },
});

const ws = new WebSocket.Server({
  port: process.env.PORT
});

ws.on('connection', (connection) => {

  connection.on('message', (message) => {

    const { event, data } = JSON.parse(message)

    let userId = null

    switch(event){
        case 'authorize':
            userId = uid
            uid += 1
            connectionsList.set(userId, connection)
            connection.sendUTF(userId)
        case 'getVideos':
            axios.post(process.env.DISPATCHER_URL, {to: 'gdrive /videos/:folderId', folderId: data.folderId, userId: userId}).then((res) => {
                connection.sendUTF(res.data)
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