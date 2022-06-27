import {
    ADD_TIMESTAMP,
    CHANGE_FOLDER_ID, DELETE_TIMECODE,
    EDIT_TIMECODE,
    LOAD_VIDEOS,
    REMOVE_VIDEO,
    REORDER_TIMESTAMPS
} from "./ActionTypes"

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

export const removeVideo = (id) => {
    return {
        type: REMOVE_VIDEO,
        payload: id
    }
}

export const editTimeCode = (id, iId, pos, value) => {
    return {
        type: EDIT_TIMECODE,
        payload: {
            id: id,
            iId: iId,
            pos: pos,
            value: value
        }
    }
}

export const deleteTimeCode = (id, iId) => {
    return {
        type: DELETE_TIMECODE,
        payload: {
            id: id,
            iId: iId
        }
    }
}