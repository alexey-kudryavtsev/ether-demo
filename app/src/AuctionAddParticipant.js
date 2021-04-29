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

import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Divider from '@material-ui/core/Divider';

const InnerComponent = ({ drizzle, drizzleState, id }) => {
  let contract = drizzle.contracts.Auction
  let [state, setState] = useState({});
  let participants = drizzleState.contracts.Auction.listParticipants;
  useEffect(() => setState({...state, listParticipantsId: contract.methods.listParticipants.cacheCall()}), [])
  let pArr = participants[state.listParticipantsId] && participants[state.listParticipantsId].value || []
  return <Card><CardContent>
  <h2>Auction Participants</h2>
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <b>Participant</b>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {pArr.map(el => <TableRow>
          <TableCell>{el}</TableCell>
        </TableRow>)}
      </TableBody>
    </Table>
  </TableContainer>
  <div style={{marginTop: '20px', maringBottom: '20px'}}></div>

  <TextField onChange={(i) => setState({...state, newParticipant: i.target.value })} label='Participant Account' margin='normal' variant='outlined' fullWidth></TextField>
  <Button style={{marginTop: '20px'}} variant="contained" onClick={()=>contract.methods.addParticipant(state.newParticipant).send()}>Add participant</Button>
</CardContent></Card>

}


export default WithDrizzle(InnerComponent)