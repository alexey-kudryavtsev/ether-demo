import React from "react";
import { DrizzleContext, DrizzleProvider } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import "./App.css";
import Router from "./Router";
import ReduxStore from "./ReduxStore"
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const drizzle = new Drizzle(drizzleOptions)

const App = () => {
  drizzle.store = ReduxStore
  return (
    <div style={{padding: '48px'}}>
      <CssBaseline />
      <DrizzleContext.Provider drizzle={drizzle} options={drizzleOptions}>
        <DrizzleContext.Consumer>
          {drizzleContext => {
            const { drizzle, drizzleState, initialized } = drizzleContext;

            if (!initialized) {
              return <Container maxWidth='md'>
              </Container>
            } else {
              return <Container maxWidth='md'>
                <Router></Router>
              </Container>
            }


          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
    </div>
  );
}

export default App;
