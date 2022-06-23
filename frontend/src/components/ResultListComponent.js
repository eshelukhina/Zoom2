import React from "react";
import "./styles.css";
import { MdOutlineOndemandVideo } from 'react-icons/md'
import { useSelector } from "react-redux";
import { videoInfo, videos } from "../redux/selectors";
import {store} from "../redux/store";
import {removeVideo} from "../redux/actions";

export default function ResultList({onClick}) {

    const items = useSelector(videos)
    const videoInfoList = useSelector(videoInfo)

    const buildItem = (item, id) => {

        const handleRemove = (event) => {
            event.stopPropagation()
            event.preventDefault()
            store.dispatch(removeVideo(item.id))
        }

        console.log(videoInfoList.length)
        console.log(videoInfoList[3])

        return(
            <div className="positioned flex-horizontal background-white border-rad-15 box-shadow padding-15 padding-h-20 margin-v-40" onClick={() => onClick(id)}>
                <div className="flex-horizontal align-content-center">
                    <MdOutlineOndemandVideo className="video-img" size={52}/>
                    <div className="flex-vertical">
                        <h3>{item.name}</h3>
                        {videoInfoList.length > id && videoInfoList[id] && <text>found {videoInfoList[id].length} parts</text>}
                        {(videoInfoList.length <= id || videoInfoList[id] === undefined || videoInfoList[id] === null) && <text>Processing...</text>}
                    </div>
                    <span className="close" onClick={handleRemove}></span>
                </div>
            </div>
        )
    }

    const buildItems = (items) => {
        const view = []
        for(const i in items){
            view.push(buildItem(items[i], i))
        }
        return view
    }

    const itemViews = buildItems(items)

    console.log(items)
    console.log(videoInfoList)

    return( 
        <div className="width-100 flex-horizontal align-content-center">
            <div className="width-60">
                {itemViews !== null && itemViews}
            </div>
        </div>
    )
}
