import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import logo from "./logo.svg";
import "./styles/tailwind.css";

import CampaignDetail from "./screens/campaign/campaignDetail";
import CampaignDashboard from "./screens/campaign/campaignDashboard";

function App({ location }) {
  return (
    <Router>
      <Switch>
        <Route exact path="/campaign/:id" component={CampaignDetail} />
        <Route exact path="/" component={CampaignDashboard} />
      </Switch>{" "}
    </Router>
  );
}
export default App;
