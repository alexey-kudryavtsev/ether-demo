import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useLocation
} from "react-router-dom";
import { DrizzleContext } from "@drizzle/react-plugin";
import WithDrizzle from "./WithDrizzle";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const InnerComponent = ({ drizzle, drizzleState, id }) => {
  let query = useQuery()
  let contract = drizzle.contracts.ChargingSiteRating
  let [state, setState] = useState({});
  return <div>
    <p>Rating Charging Site {id}</p>
    <input onChange={(i) => setState({...state, rating: i.target.value })}></input>
    <button onClick={()=>contract.methods.addRating.cacheSend(parseInt(state.rating), id, {from: query.get("active-account")})}>Rate!</button>
  </div>

}


export default WithDrizzle(InnerComponent)