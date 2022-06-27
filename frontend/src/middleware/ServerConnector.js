import {store} from "../redux/store";
import {loadVideos, removeVideo} from "../redux/actions";

const backendURL = 'ws://localhost:8080'

export default class ServerConnector {

    static webSocketConn = null

    static establishConnection = () => {
        ServerConnector.webSocketConn = new WebSocket(backendURL)
        ServerConnector.webSocketConn.onmessage = (event) => {
            console.log("0")
            const data = JSON.parse(event.data)
            if(data.type === "loadVideos"){
                console.log("1")
                console.log(data.data)
                store.dispatch(loadVideos(data.data))
            } else if(data.type === "approveGoToCut"){
                if(data.status === "OK"){
                    removeVideo(event.data.videoId)
                    alert("Your video was successfully sent")
                } else {
                    alert("Couldn't send video to cut, please try again")
                }
            }
        }
    }

    static sendFolderID = () => {
        ServerConnector.webSocketConn.send(JSON.stringify({event: 'getVideos', data: {folderId: store.getState().data.folderID}}))
    }

    static sendVideoToProcess = (videoId, timecodes) => {
        ServerConnector.webSocketConn.send(JSON.stringify({event: 'cutVideo', data: {videoId: videoId, timecodes: timecodes}}))
    }
}