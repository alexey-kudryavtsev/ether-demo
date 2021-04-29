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

const InnerComponent = ({ drizzle, drizzleState, id }) => {

  let [participantState, setParticipantState] = useState({})

  let winner = drizzleState.contracts.Auction.winner;
  let winningBet = drizzleState.contracts.Auction.winningBet;
  useEffect(() => setParticipantState({
    winnerId: drizzle.contracts.Auction.methods.winner.cacheCall(),
    winningBet: drizzle.contracts.Auction.methods.winningBet.cacheCall()
  }), [])

  let winnerResult = winner[participantState.winnerId] && winner[participantState.winnerId].value || 0
  let winningBetResult = winningBet[participantState.winningBet] && winningBet[participantState.winningBet].value || 0

  if (winnerResult == 0) {
    return <Card>
      <CardContent>
        <h2>Auction in progress...</h2>
      </CardContent></Card>
  } else {
    return <Card>
      <CardContent>
        <h2>Auction ended</h2>
        <p><b>Winner: </b>{winnerResult}</p>
        <p><b>Winning bet: </b>{winningBetResult}</p>
      </CardContent>
    </Card>
  }

}


export default WithDrizzle(InnerComponent)