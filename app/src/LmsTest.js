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

const check = (drizzle, setFailState, id, answers) => () => {
  console.log(answers)
  if (answers.first && answers.second) {
    drizzle.contracts.SkillNft.methods.awardSkill.cacheSend(id, "http://tyrell-corporation.online/skills/engineer", {gas: 5000000})}
  else {
    setFailState(true)
  }}

const InnerComponent = ({ drizzle, drizzleState, id }) => {
  let [failState, setFailState] = useState(false)
  let contract = drizzle.contracts.SkillNft
  let [state, setState] = useState(null);
  let [answerState, setAnswerState] = useState({})
  useEffect(() => setState(contract.methods.balanceOf.cacheCall(id)), [])
  let bof = drizzleState.contracts.SkillNft.balanceOf
  if (failState) {
    return <p>Sorry, you failed.</p>
  }
  if (bof[state] && parseInt(bof[state].value) > 0) {
    return <p>You've passed Qualification Test, Skill NFT </p>
  } else {
    return <div>
      <p>Engineer Qualification Test</p>
      <input type='checkbox' onChange={(i)=>setAnswerState({first: i.target.value, ...answerState})}></input>
      <input type='checkbox' onChange={(i)=>setAnswerState({second: i.target.value, ...answerState})}></input>
      <button onClick={check(drizzle, setFailState, id, answerState)}>Check Results</button>
    </div>
  }
}


export default WithDrizzle(InnerComponent)