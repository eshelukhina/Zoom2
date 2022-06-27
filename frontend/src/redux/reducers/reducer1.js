import { wait } from "@testing-library/user-event/dist/utils"
import {
    REORDER_TIMESTAMPS,
    ADD_TIMESTAMP,
    CHANGE_FOLDER_ID,
    LOAD_VIDEOS,
    REMOVE_VIDEO,
    EDIT_TIMECODE, DELETE_TIMECODE
} from "../ActionTypes"
    
    
const initialState = {
    folderID: "",
    videos: [
        {id: "1ZSLIoCbngTf1ViMUVd4XLQcj0s2Z03On", name: "zoom4"},
        {id: "1ZSLIoCbngTf1ViMUVd4XLQcj0s2Z03On", name: "zoom4"},
        {id: "1ZSLIoCbngTf1ViMUVd4XLQcj0s2Z03On", name: "zoom4"}
    ],
    videoInfo: [[["00:00:02", "00:00:05"], ["00:00:06", "00:00:07"]], null, null]
}
    
export const reducer1 = (state = initialState, action) => {
    switch(action.type){
        case REORDER_TIMESTAMPS:
            const v = state.videoInfo.slice()
            const videoInfoElem = v[Number(action.payload.id)]
            const elem = videoInfoElem[action.payload.from]
            console.log(elem)
            const videoElemRemoved = videoInfoElem.filter((el) => el !== elem)
            console.log(videoElemRemoved)
            wait(1000)
            if(action.payload.to == -1){
                videoElemRemoved.unshift(elem)
            } else {
                const elemTo = videoInfoElem[action.payload.to]
                console.log(elemTo)
                const pos = videoElemRemoved.indexOf(elemTo)
                console.log(pos)
                videoElemRemoved.splice(pos + 1, 0, elem)
            }
            v.splice(Number(action.payload.id), 1, videoElemRemoved)
            return {
                ...state,
                videoInfo: v
            }
        case ADD_TIMESTAMP:
            const timestamps = state.videoInfo.slice()
            timestamps[action.payload.id].push(["00:00:00", "00:00:00"])
            return {
                ...state,
                videoInfo: timestamps
            }
        case CHANGE_FOLDER_ID:
            return {
                ...state,
                folderID: action.payload
            }
        case LOAD_VIDEOS:
            return {
                ...state,
                videos: action.payload,
                videoInfo: new Array(action.payload.length)
            }
        case REMOVE_VIDEO:
            const i = state.videos.findIndex(elem => elem.id === action.payload)
            return {
                ...state,
                videos: state.videos.slice(0, i).concat(state.videos.slice(i + 1, state.videos.length)),
                videoInfo: state.videoInfo.slice(0, i).concat(state.videoInfo.slice(i + 1, state.videoInfo.length))
            }
        case EDIT_TIMECODE:
            const infoEdit = new Array(...state.videoInfo)
            infoEdit[action.payload.id][action.payload.iId][action.payload.pos] = action.payload.value
            return {
                ...state,
                videoInfo: infoEdit
            }
        case DELETE_TIMECODE:
            const infoDel = new Array(...state.videoInfo)
            let newElem = infoDel[action.payload.id]
            newElem = newElem.slice(0, action.payload.iId).concat(newElem.slice(action.payload.iId + 1, newElem.length))
            infoDel[action.payload.id] = newElem
            return {
                ...state,
                videoInfo: infoDel
            }
        default:
            return state
    }
}