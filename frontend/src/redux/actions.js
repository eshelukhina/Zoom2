import {ADD_TIMESTAMP, CHANGE_FOLDER_ID, LOAD_VIDEOS, REORDER_TIMESTAMPS} from "./ActionTypes"

export const moveTimecodes = (id, from, to) => {
    return {
        type: REORDER_TIMESTAMPS,
        payload: {
            id: id,
            from: from,
            to: to
        }
    }
}

export const addTimecode = (id) => {
    return {
        type: ADD_TIMESTAMP,
        payload: {
            id: id
        }
    }
}

export const loadVideos = (videos) => {
    return {
        type: LOAD_VIDEOS,
        payload: videos
    }
}

export const changeFolderID = (id) => {
    return {
        type: CHANGE_FOLDER_ID,
        payload: id
    }
}