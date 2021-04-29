import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  useParams
} from "react-router-dom";
import { DrizzleContext } from "@drizzle/react-plugin";
import WithDrizzle from "./WithDrizzle";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button'


const check = (drizzle, setFailState, id, answers) => () => {
  console.log(answers)
  if (answers.first && answers.second) {
    drizzle.contracts.SkillNft.methods.awardSkill.cacheSend(id, "http://tyrell-corporation.online/skills/engineer", { gas: 5000000 })
  }
  else {
    setFailState(true)
  }
}

const InnerComponent = ({ drizzle, drizzleState, id }) => {
  let [failState, setFailState] = useState(false)
  let contract = drizzle.contracts.SkillNft
  let [state, setState] = useState(null);
  let [state2, setState2] = useState(null);
  let [answerState, setAnswerState] = useState({})
  useEffect(() => setState(contract.methods.balanceOf.cacheCall(id)), [])
  useEffect(() => setState2(contract.methods.certIdsByOwner.cacheCall(id)), [])
  let bof = drizzleState.contracts.SkillNft.balanceOf
  let cibo = drizzleState.contracts.SkillNft.certIdsByOwner
  if (failState) {
    return <Card><CardContent>Sorry, you failed to qualify.</CardContent></Card>
  }
  if (bof[state] && parseInt(bof[state].value) > 0) {
    return <Card><CardContent>You've passed Qualification Test, Skill NFT {cibo[state2] && cibo[state2].value}</CardContent></Card>
  } else {
    return <Card>
      <CardContent>
        <div>
          <h2>Engineer Qualification Test</h2>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={answerState.first} onChange={(i) => setAnswerState({ ...answerState, first: i.target.checked, })} color="default"  />}
              label="I am a qualified engineer"
            />
            <FormControlLabel
              control={<Switch checked={answerState.second} onChange={(i) => setAnswerState({ ...answerState, second: i.target.checked, })} color="default" />}
              label="I confirm that the information above is correct"
            />
          </FormGroup>
          <Button variant="contained" style={{marginTop: '20px'}} onClick={check(drizzle, setFailState, id, answerState)}>Submit information</Button>
        </div>
      </CardContent>
    </Card>
  }
}


export default WithDrizzle(InnerComponent)