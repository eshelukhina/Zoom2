import React from "react";
import "./styles.css";

export default class LinkEnter extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="flex-horizontal width-100 align-content-center padding-v-28">
                <div className="width-60 flex-horizontal">
                    <input placeholder="Link" className="link-enter-field"/>
                    <button className="margin-left-8">Process</button>
                </div>
            </div>
        )
    }
}