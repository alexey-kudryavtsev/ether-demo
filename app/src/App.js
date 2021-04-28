import React from "react";
import { DrizzleContext, DrizzleProvider } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import MyComponent from "./MyComponent";
import "./App.css";
import Router from "./Router";
import ReduxStore from "./ReduxStore"

const drizzle = new Drizzle(drizzleOptions)

const App = () => {
  drizzle.store = ReduxStore
  return (
    <DrizzleContext.Provider drizzle={drizzle} options={drizzleOptions}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return "Loading..."
          }

          return (
            <Router></Router>
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
