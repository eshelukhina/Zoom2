import React from "react";
import "./styles.css";
import {store} from "../redux/store";
import {changeFolderID} from "../redux/actions";
import ServerConnector from "../middleware/ServerConnector";

export default class LinkEnter extends React.Component {

    constructor(props){
        super(props);
    }

    handleChange = (event) => {
        store.dispatch(changeFolderID(event.target.value))
    }

    handleSubmit = () => {
        ServerConnector.sendFolderID()
    }

    render(){
        return(
            <div className="flex-horizontal width-100 align-content-center padding-v-28">
                <div className="width-60 flex-horizontal">
                    <input placeholder="Folder ID" className="link-enter-field" onChange={this.handleChange}/>
                    <button className="margin-left-8" onClick={this.handleSubmit}>Process</button>
                </div>
            </div>
        )
    }
}