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
  let contract = drizzle.contracts.Auction
  let [state, setState] = useState({});
  let participants = drizzleState.contracts.Auction.listParticipants;
  useEffect(() => setState({listParticipantsId: contract.methods.listParticipants.cacheCall(), ...state}), [])
  let pArr = participants[state.listParticipantsId] && participants[state.listParticipantsId].value || []
  return <div>
    <p>Auction Participants</p>
    {pArr.map(el => <p>{el}</p>)}
    <input onChange={(i) => setState({ newParticipant: i.target.value, ...state })}></input>
    <button onClick={()=>contract.methods.addParticipant(state.newParticipant).send()}>Add Participant</button>
  </div>

}


export default WithDrizzle(InnerComponent)