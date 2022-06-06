import React from "react";
import "./styles.css"

export default class Header extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="width-100 space-between blue">
                <a href="https://zoom.us/" className="header-height-70"><img src="./assets/Zoom2.png"  height="70" width="120" alt="zoom2"/></a >
            </div>
        )
    }
}