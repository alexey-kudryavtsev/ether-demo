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

import Rating from '@material-ui/lab/Rating';

const InnerComponent = ({ drizzle, drizzleState, id }) => {
  let contract = drizzle.contracts.ChargingSiteRating
  let [state, setState] = useState({});
  let clients = drizzleState.contracts.ChargingSiteRating.listClients;
  useEffect(() => setState({ ...state, listClientsId: contract.methods.listClients.cacheCall() }), [])
  let pArr = clients[state.listClientsId] && clients[state.listClientsId].value || [[], []]
  let list = []
  for (var i = 0; i < pArr[0].length; i++) {
    list.push([pArr[0][i], pArr[1][i]])
  }
  console.log(list)
  return <Card>
    <CardContent>
      <h2>Charging Sites</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Charging Site</b>
              </TableCell>
              <TableCell>
                <b>Rating</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(el => <TableRow>
              <TableCell>{el[0]}</TableCell>
              <TableCell><Rating value={(el[1] / 100)} precision={0.1} readOnly></Rating></TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent></Card>

}


export default WithDrizzle(InnerComponent)