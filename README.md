# Blockchain Demo Apps

## Overview

The project consists of 3 interconnected DApps that form a prototypical ecosystem:
 - Engineer certification DApp
 - Auction/Tendering DApp
 - Rating DApp

### Engineer Certification Dapp
Asks an engineer to prove qualification (via online form/quiz) and mints Skill NFT if he/she succeeds.

### Auction/Tendering DApp
Can be used to organize a minimal price auction for the right to be charging site operation.
Has 2 roles - auction administrator (landlord) and participants. The administrator adds participants to the list thus permitting them to place bets.
Participants place blind bets (hashed bet sum + participant secret nonce). When all the blind bets are placed, participants reveal their bets and the smart contract determines the winner.
The winner is granted a Charging Site NFT.

### Rating DApp
Allows engineers and charging site operators to rate each other. Only the holders of Skill NFTs (i.e. engineers) can rate charging sites and only the holders of Charging Site NFTs (i.e. ch. site operators) can rate engineers.

## Installation
### Dev environment
- install and run ganache or ganache-cli
- install truffle (`npm install -g truffle`)
- deploy contracts to ganache (`truffle migrate --network ganache`)
- navigate to /app folder and run `npm start` to run React app dev server

### Testnet/Mainnet
- define testnet/mainnet in truffle-config.js
- set customProvider option in app/drizzleOptions.js
- deploy with `truffle migrate --network <testnet/mainnet>`
- run `cd app && npm run build`
- serve React app javascript normally
