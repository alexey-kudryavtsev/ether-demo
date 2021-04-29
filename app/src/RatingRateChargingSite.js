import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  useParams,
  useLocation
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
import Rating from '@material-ui/lab/Rating';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const InnerComponent = ({ drizzle, drizzleState, id }) => {
  let query = useQuery()
  let contract = drizzle.contracts.ChargingSiteRating
  let [state, setState] = useState({});
  return <Card>
    <CardContent>
      <h2>Rate Charging Site [{id}]</h2>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Rating precision={1} size="large" value={0} onChange={(e,i) => {
          setState({ ...state, rating: i });
          contract.methods.addRating.cacheSend(i, id, { from: query.get("active-account"), gas: 5000000 })
        }}></Rating>
      </div>
    </CardContent></Card>

}


export default WithDrizzle(InnerComponent)