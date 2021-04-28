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
    return <div>
      <p>Auction in progress</p>
    </div>
  } else {
    return <p>Winner:{winnerResult}, winning bet {winningBetResult}</p>
  }

}


export default WithDrizzle(InnerComponent)