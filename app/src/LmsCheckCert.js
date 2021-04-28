import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";


export default function Component () {
    let { id } = useParams();
    return <div>Check cert { id }</div>
}