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
    console.log(req.body)
    const data = req.body
    switch(data.to){
        case 'gdrive /videos/:folderId':
            axios.default.get(`${process.env.GDRIVE_URL}/videos/${data.folderId}`).then((res1) => {
                const recievedData = res1.data
                console.log(recievedData)
                for(i in recievedData){
                    const id = recievedData[i].id
                    const message = {userId: data.userId, videoId: id}
                    publish("intervals", message)
                }
                res.status(200)
                res.send(res1.data)
            })
            break
        case 'cutting /cut':
            const isSuccess = await publish('cut', data)
            res.status(200)
            if(isSuccess){
                res.send(JSON.stringify({status: 'OK'}))
            } else {
                res.send(JSON.stringify({status: 'Failed'}))
            }
            break
        default:
            return
    }
})

app.listen(8081, () => {
    console.log("listening on port 8081")
})