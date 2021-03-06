import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AuctionAddBet from "./AuctionAddBet"
import AuctionAddParticipant from "./AuctionAddParticipant"
import AuctionResults from "./AuctionResults"
import LmsCheckCert from "./LmsCheckCert"
import LmsTest from "./LmsTest"
import RatingListChargingSites from "./RatingListChargingSites"
import RatingListEngineers from "./RatingListEngineers"
import RatingRateChargingSite from "./RatingRateChargingSite"
import RatingRateEngineer from "./RatingRateEngineer"

export default function RootRouter() {
    return (
        <Router>
            <div>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    {/* LMS */}
                    <Route path="/lms/test/:id">
                        <LmsTest />
                    </Route>
                    <Route path="/lms/check-cert">
                        <LmsCheckCert />
                    </Route>

                    {/* Ratings */}
                    <Route path="/ratings/rate-engineer/:id">
                        <RatingRateEngineer />
                    </Route>
                    <Route path="/ratings/rate-charging-site/:id">
                        <RatingRateChargingSite />
                    </Route>
                    <Route path="/ratings/list-engineers">
                        <RatingListEngineers />
                    </Route>
                    <Route path="/ratings/list-charging-sites">
                        <RatingListChargingSites />
                    </Route>

                    {/* auctions */}
                    <Route path="/auction/add-participant">
                        <AuctionAddParticipant />
                    </Route>
                    <Route path="/auction/add-bet/:id">
                        <AuctionAddBet />
                    </Route>
                    <Route path="/auction/results">
                        <AuctionResults />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}