import { wait } from "@testing-library/user-event/dist/utils"
import {REORDER_TIMESTAMPS, ADD_TIMESTAMP, CHANGE_FOLDER_ID, LOAD_VIDEOS} from "../ActionTypes"
    
    
const initialState = {
    folderID: "",
//    videos: [],
    videos: [
        {id: "1ZSLIoCbngTf1ViMUVd4XLQcj0s2Z03On", name: "zoom4"},
        {id: "1ZSLIoCbngTf1ViMUVd4XLQcj0s2Z03On", name: "zoom4"},
        {id: "1ZSLIoCbngTf1ViMUVd4XLQcj0s2Z03On", name: "zoom4"}
    ],
    videoInfo: []
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
            timestamps[action.payload.id].push([0, 0])
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
                videos: action.payload
            }
        default:
            return state
    }
}