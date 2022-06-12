const axios = require('axios');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {connect, publish} = require('./publisher');

connect()

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())



app.post('/', async (req, res) => {
    const data = JSON.parse(req.body)
    switch(data.to){
        case 'gdrive /videos/:folderId':
            axios.default.get(`${process.env.GDRIVE_URL}/videos/${data.folderId}`, (res1) => {
                const recievedData = res1.data
                for(i in recievedData){
                    const id = recievedData[i].id
                    const message = {userId: data.userId, videoId: id}
                    publish("intervals", message)
                }
                res.status(200)
                res.send(res1.data)
            })
            return
        case 'cutting /cut':
            return //TODO
        default:
            return
    }
})