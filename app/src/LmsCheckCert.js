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

const check = (drizzle, state, setState, id) => () => {
  drizzle.contracts.SkillNft.methods.ownerOf(parseInt(id)).call().then((owner) => {
    drizzle.contracts.SkillNft.methods.tokenURI(parseInt(id)).call().then((uri) => {
      console.log(owner, uri)
      setState({ owner: owner, skill: uri, ...state })
    })
  })


}

const InnerComponent = ({ drizzle, drizzleState, id }) => {
  let contract = drizzle.contracts.SkillNft
  let [state, setState] = useState({});
  let getOwner = drizzleState.contracts.SkillNft.ownerOf
  let getUri = drizzleState.contracts.SkillNft.tokenURI
  console.log(getOwner)
  console.log(getUri)
  return <div>
    <p>Engineer Certificate Checker</p>
    <input onChange={(i) => setState({ certId: i.target.value })}></input>
    <button onClick={check(drizzle, state, setState, state.certId)}>Check Certificate</button>
    <p>{state.owner}</p>
    <p>{state.skill}</p>
  </div>

}


export default WithDrizzle(InnerComponent)