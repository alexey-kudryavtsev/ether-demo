import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";
import { DrizzleContext } from "@drizzle/react-plugin";

export default F => (props) => {
    let { id } = useParams();
    return (
        <DrizzleContext.Consumer>
            {drizzleContext => {
                const { drizzle, drizzleState, initialized } = drizzleContext;
                return <F drizzle={drizzle} drizzleState={drizzleState} id={id} {...props}></F>
            }}
        </DrizzleContext.Consumer>);
}