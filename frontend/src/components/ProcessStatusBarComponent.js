import React from "react";
import './styles.css'

export default class ProcessStatusBar extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="width-100 height-40 align-content-center">
                <p>
                    You have no video in process...
                    Please start with link entering above...
                </p>
            </div>
        )
    }
}