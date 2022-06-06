import { ADD_TIMESTAMP, REORDER_TIMESTAMPS } from "./ActionTypes"

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