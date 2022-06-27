const express = require('express');
const axios = require('axios')
require('dotenv').config();

const app = express()

app.get('/videos/:folderId', (req, res) => {
    const folderId = req.params.folderId
    console.log(folderId)
    axios.default.get(`https://www.googleapis.com/drive/v3/files?q=%27${folderId}%27+in+parents&key=${process.env.API_ACCESS_KEY}`)
    .then(pRes1 => {
        const files = pRes1.data.files
        const videos = files.filter(file => file["mimeType"].startsWith("video"))
        const resData = []
        for(i in videos){
            resData.push({id: videos[i]["id"], name: videos[i]["name"]})
        }
        res.status(200)
        res.send(JSON.stringify(resData))
    }, err => {
        //console.log(err)
        console.log("Error here")
    })
})

app.listen(8083, () => {
    console.log("GDrive is listening on port 8083")
})