import {store} from "../redux/store";
import {loadVideos} from "../redux/actions";

const backendURL = 'ws://localhost:8080'

export default class ServerConnector {

    static webSocketConn = null

    static establishConnection = () => {
        ServerConnector.webSocketConn = new WebSocket(backendURL)
        ServerConnector.webSocketConn.onmessage = (event) => {
            const data = JSON.parse(event.data)
            console.log(data)
            store.dispatch(loadVideos(data))
        }
    }

    static sendFolderID = () => {
        ServerConnector.webSocketConn.send(JSON.stringify({event: 'getVideos', data: {folderId: store.getState().data.folderID}}))
    }
}