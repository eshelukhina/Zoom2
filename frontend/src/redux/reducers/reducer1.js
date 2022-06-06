import { wait } from "@testing-library/user-event/dist/utils"
import { REORDER_TIMESTAMPS, ADD_TIMESTAMP } from "../ActionTypes"
    
    
const initialState = {
    folderLink: "",
//    videos: [],
    videos: [
        {link: "https://drive.google.com/file/d/1ZSLIoCbngTf1ViMUVd4XLQcj0s2Z03On/preview", name: "zoom4"},
        {link: "https://drive.google.com/file/d/1ZSLIoCbngTf1ViMUVd4XLQcj0s2Z03On/preview", name: "zoom4"},
        {link: "https://drive.google.com/file/d/1ZSLIoCbngTf1ViMUVd4XLQcj0s2Z03On/preview", name: "zoom4"}
    ],
    videoInfo: [[[0, 4],[6, 20], [5, 7]], [[0, 4],[6, 20]], [[0, 4],[6, 20]]]
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
        default:
            return state
    }
}