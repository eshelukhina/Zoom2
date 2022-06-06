import React from "react";
import "./styles.css";
import { MdOutlineOndemandVideo } from 'react-icons/md'
import { useSelector } from "react-redux";
import { videoInfo, videos } from "../redux/selectors";

//var SCOPE = 'https://www.googleapis.com/auth/drive.file';
//var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

export default function ResultList({onClick}) {

    const items = useSelector(videos)
    const videoInfoList = useSelector(videoInfo)

    const buildItem = (item, id) => {
        return(
            <div className="flex-horizontal background-white border-rad-15 box-shadow padding-15 padding-h-20 margin-v-40" onClick={() => onClick(id)}>
                <div className="flex-horizontal align-content-center">
                    <MdOutlineOndemandVideo className="video-img" size={52}/>
                    <div className="flex-vertical">
                        <h3>{item.name}</h3>
                        {videoInfoList[id] !== null && <text>found {videoInfoList[id].length} parts</text>}
                        {videoInfoList[id] === null && <text>Processing...</text>}
                    </div>
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

    //componentDidMount(){
    //    var script = document.createElement('script');
    //    script.onload=this.handleClientLoad;
    //    script.src="https://apis.google.com/js/api.js";
    //    document.body.appendChild(script);
    //}
    
    
    //initClient = () => {
    //    try{
    //      window.gapi.client.init({
    //          'apiKey': process.env.ACCESS_KEY,
    //          'scope': SCOPE,
    //          'discoveryDocs': [discoveryUrl]
    //        }).then(() => {
    //          console.log(window.gapi.client)
    //          this.setState({
    //            client: window.gapi.client
    //          })
    //      });
    //    }catch(e){
    //      console.log(e);
    //    }
    //}
    
    //handleClientLoad = ()=>{
    //    window.gapi.load('client', this.initClient);
    //}

    const itemViews = buildItems(items)

    return( 
        <div className="width-100 flex-horizontal align-content-center">
            <div className="width-60">
                {itemViews !== null && itemViews}
            </div>
        </div>
    )
}
