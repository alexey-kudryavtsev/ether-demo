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

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

const check = (drizzle, state, setState, id) => () => {
  drizzle.contracts.SkillNft.methods.ownerOf(parseInt(id)).call().then((owner) => {
    drizzle.contracts.SkillNft.methods.tokenURI(parseInt(id)).call().then((uri) => {
      console.log(owner, uri)
      setState({ ...state, owner: owner, skill: uri })
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
  return <Card><CardContent>
    <h2>Engineer Certificate Checker</h2>
    <TextField onChange={(i) => setState({ certId: i.target.value })} label='Certificate ID' margin='normal' variant='outlined' fullWidth></TextField>
    <Button style={{marginTop: '20px'}} variant="contained" onClick={check(drizzle, state, setState, state.certId)}>Check Certificate</Button>
    <p style={{marginTop: '30px'}}><b>Skill token owner: </b>{state.owner}</p>
    <p><b>Skill meta (URI): </b>{state.skill}</p>
  </CardContent></Card>

}


export default WithDrizzle(InnerComponent)