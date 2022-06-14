import React, { useEffect } from "react";
import { addTimecode, moveTimecodes } from "../redux/actions";
import "./styles.css"
import { store } from "../redux/store"
import { useSelector } from "react-redux";
import { videoInfo, videos } from "../redux/selectors";

export default function ReviewItem({id, onConfirmClick, onCancelClick}){

    const videoList = useSelector(videos)
    const videoInfoList = useSelector(videoInfo)

    const secsToStr = (secs) => {
        const hours = Math.floor(secs / 3600)
        const minutes = Math.floor(secs / 60) - hours * 60
        const sec = secs - (hours * 60 * 60) - minutes * 60
        return `${hours}:${minutes}:${sec}`
    }

    const buildItem = (iId) => {



        return(
            <div className="my__item flex-horizontal align-content-center background-white border-rad-15 box-shadow padding-15 padding-h-20 width-100" draggable="true" id={iId}>
                <div className="margin-right-from-field">
                    <text>from </text>
                    <input value={secsToStr(videoInfoList[id][iId][0])}></input>
                </div>
                <div>
                    <text>to </text>
                    <input value={secsToStr(videoInfoList[id][iId][1])}></input>
                </div>
            </div>

        )
    }

    const buildItems = () => {
        const view = []
        view.push(<div className="delimeter" id={0}></div>)
        let i = 0
        while(videoInfoList.length > id && i < videoInfoList[id].length){
            view.push(buildItem(i))
            view.push(<div className="delimeter" id={Number(i) + 1}></div>)
            i += 1
        }
        return view
    }

    useEffect(() => {
        console.log("Mounted")
        const items = document.querySelectorAll('.my__item')
        const places = document.querySelectorAll('.delimeter')

        let elem_ind = null

        const dragStart = (event) => {
            setTimeout(() => {
                console.log(event.target)
                elem_ind = event.target.id
                event.target.classList.add('hide-02')
            }, 0)
        }

        const dragEnd = (event) => {
            event.preventDefault()
            event.target.classList.remove('hide-02')
        }

        const dragOver = (event) => {
            event.preventDefault()
        }

        const dragEnter = (event) => {
            event.preventDefault()
            event.target.classList.add('focused')
        }

        const dragLeave = (event) => {
            event.preventDefault()
            event.target.classList.remove('focused')
        }

        const dragDrop = (event) => {
            event.preventDefault()
            event.target.classList.remove('focused')
            console.log(id, " ", elem_ind, " ", event.target.id)
            if(event.target.id == elem_ind || event.target.id == Number(elem_ind) + 1){
                return
            }
            console.log("Hey")
            store.dispatch(moveTimecodes(id, elem_ind, event.target.id - 1))
        }

        let i = 0
        while(i < items.length){
            items[i].addEventListener('dragstart', dragStart)
            items[i].addEventListener('dragend', dragEnd)
            i += 1;
        }

        let j = 0
        while(j < places.length){
            places[j].addEventListener('dragover', dragOver)
            places[j].addEventListener('dragenter', dragEnter)
            places[j].addEventListener('dragleave', dragLeave)
            places[j].addEventListener('drop', dragDrop)
            j += 1;
        }

        return () => {
            i = 0
            while(i < items.length){
                items[i].removeEventListener('dragstart', dragStart)
                items[i].removeEventListener('dragend', dragEnd)
                i += 1;
            }

            j = 0
            while(j < places.length){
                places[j].removeEventListener('dragover', dragOver)
                places[j].removeEventListener('dragenter', dragEnter)
                places[j].removeEventListener('dragleave', dragLeave)
                places[j].removeEventListener('drop', dragDrop)
                j += 1;
            }
        }
    }, [videoInfoList]);

    const handleAddClick = () => {
        store.dispatch(addTimecode(id))
    }

    const items = buildItems()
    console.log(videoList[id].id)
    const link = `https://drive.google.com/file/d/${videoList[id].id}/preview`
    return(
        <div className="flex-vertical">
            <div className="flex-horizontal margin-top-100 width-100">
                <div className="margin-h-40">
                    <iframe src={link} width="960" height="720" allow="autoplay"/>
                </div>
                <div className="flex-vertical width-calc-list">
                    <div className="flex-horizontal align-content-center">
                        <h2 className="margin-right-30">
                            Timecodes
                        </h2>
                        <button className="add-button" onClick={handleAddClick}>
                            Add
                        </button>
                    </div>
                    {items !== null && items}
                </div>
            </div>
            <div className="flex-vertical margin-top-22 align-items-right">
                <div className="flex-horizontal margin-right-48">
                    <button className="select-button button-neg margin-right-12" onClick={onConfirmClick}>Cancel</button>
                    <button className="select-button button-pos" onClick={onCancelClick}>Apply</button>
                </div>
            </div>
        </div>
    )
}