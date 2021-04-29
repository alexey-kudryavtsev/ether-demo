import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { DrizzleContext } from "@drizzle/react-plugin";
import WithDrizzle from "./WithDrizzle";

const InnerComponent = ({ drizzle, drizzleState, id }) => {
  let contract = drizzle.contracts.ChargingSiteRating
  let [state, setState] = useState({});
  let clients = drizzleState.contracts.ChargingSiteRating.listClients;
  useEffect(() => setState({...state, listClientsId: contract.methods.listClients.cacheCall()}), [])
  let pArr = clients[state.listClientsId] && clients[state.listClientsId].value || [[],[]]
  let list = []
  for(var i = 0; i < pArr[0].length; i++) {
    list.push([pArr[0][i],pArr[1][i]])
  }
  console.log(list)
  return <div>
    <p>Charging Sites</p>
    {list.map(el => <p>{el[0] + " : " + (el[1] / 100)}</p>)}
  </div>

}


export default WithDrizzle(InnerComponent)