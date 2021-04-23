import { Component } from "react";
import Dashboard from "../pages/Dashboard";
import TenantDashboard from "../pages/TenantDashboard";
import OutletScores from "../pages/OutletScores";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function roleValidation() {
  var isAuditor = false;
  if (localStorage.getItem("roleId") == "1") {
    isAuditor = true;
  }
  console.log(isAuditor);
  return isAuditor;
}

class RouteWrapper extends Component {
  render() {
    if (roleValidation()) {
      console.log(localStorage);
      return (
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/outletscores">
            <OutletScores />
          </Route>
        </Switch>
      );
    }
    return (
      <Route path="/dashboard">
        <TenantDashboard />
      </Route>
    );
  }
}

export default RouteWrapper;
