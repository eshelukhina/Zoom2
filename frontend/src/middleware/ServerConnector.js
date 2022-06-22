import {store} from "../redux/store";
import {loadVideos, removeVideo} from "../redux/actions";

const backendURL = 'ws://localhost:8080'

export default class ServerConnector {

    static webSocketConn = null

    static establishConnection = () => {
        ServerConnector.webSocketConn = new WebSocket(backendURL)
        ServerConnector.webSocketConn.onmessage = (event) => {
            if(event.data.type === "loadVideos"){
                const data = JSON.parse(event.data.data)
                console.log(data)
                store.dispatch(loadVideos(data))
            } else if(event.data.type === "approveGoToCut"){
                if(event.data.status === "OK"){
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