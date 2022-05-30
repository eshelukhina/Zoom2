import React from "react";
import "./styles.css";
import { Button, Input } from "reactstrap";

export default class LinkEnter extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="flex-horizontal width-100 align-content-center padding-v-28">
                <div className="width-60 flex-horizontal">
                    <Input placeholder="Link"/>
                    <Button className="margin-left-8">Process</Button>
                </div>
            </div>
        )
    }
}