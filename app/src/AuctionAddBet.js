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
import AuctionResults from "./AuctionResults"

const hashBet = (bet, nonce, web3) => {
  let encoded = web3.eth.abi.encodeParameter('uint256', parseInt(bet) * Math.pow(2, 32) + parseInt(nonce))
  let hashed = web3.utils.soliditySha3(encoded)
  console.log(bet, nonce, parseInt(bet) * Math.pow(2, 32) + parseInt(nonce), encoded, hashed)
  return hashed
}

const sendBlindBet = (bet, nonce, id, drizzle) => {
  drizzle.contracts.Auction.methods.placeBlindBet.cacheSend(hashBet(bet, nonce, drizzle.web3), { from: id, gas: 5000000 })
}

const InnerComponent = ({ drizzle, drizzleState, id }) => {
  let [nonce] = useState(localStorage.getItem(id + "-LastNonce") || Math.floor(Math.random() * Math.pow(2, 32)))
  let [bet, setBet] = useState(localStorage.getItem(id + "-LastNonce"))
  useEffect(() => localStorage.setItem(id + "-LastNonce", nonce), [])
  useEffect(() => localStorage.setItem(id + "-LastBet", bet), [bet])

  let [participantState, setParticipantState] = useState({})
  let participants = drizzleState.contracts.Auction.listParticipants;
  let bbc = drizzleState.contracts.Auction.blindBetCount;
  let winner = drizzleState.contracts.Auction.winner;
  let winningBet = drizzleState.contracts.Auction.winningBet;
  useEffect(() => setParticipantState({
    listParticipantsId: drizzle.contracts.Auction.methods.listParticipants.cacheCall(),
    bbcId: drizzle.contracts.Auction.methods.blindBetCount.cacheCall(),
    winnerId: drizzle.contracts.Auction.methods.winner.cacheCall(),
    winningBet: drizzle.contracts.Auction.methods.winningBet.cacheCall()
  }), [])

  let pArr = participants[participantState.listParticipantsId] && participants[participantState.listParticipantsId].value || []

  let bbcResult = bbc[participantState.bbcId] && bbc[participantState.bbcId].value || 0
  let winnerResult = winner[participantState.winnerId] && winner[participantState.winnerId].value || 0
  let winningBetResult = winningBet[participantState.winningBet] && winningBet[participantState.winningBet].value || 0

  useEffect(() => {
    if (bbcResult == pArr.length && bbcResult > 0) {
      drizzle.contracts.Auction.methods.revealBet.cacheSend(bet, nonce, { gas: 5000000, from: id })
    }
  }, [bbcResult, bet])

  if (winnerResult == 0) {
    return <div>
      <p>Place bet as participant [account {id}]</p>
      <p>Blind Bets: {bbcResult} of {pArr.length}</p>
      <input onChange={(i) => setBet(i.target.value)}></input>
      <button onClick={() => sendBlindBet(bet, nonce, id, drizzle)}>Place Bet</button>
    </div>
  } else {
    return <div>
      <p>Auction ended</p>
      <AuctionResults></AuctionResults>
    </div>
  }

}


export default WithDrizzle(InnerComponent)