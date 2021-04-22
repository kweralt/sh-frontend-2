import { Component } from 'react';
import Dashboard from "../pages/Dashboard";
import TenantDashboard from "../pages/TenantDashboard";
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
        if (roleValidation()){
            console.log(localStorage);
            return (
                <Route path="/dashboard">
                    <Dashboard/>
                </Route>
            )
        }
        return (
            <Route path="/dashboard">
                <TenantDashboard/>
            </Route>
        )
    }
}


export default RouteWrapper;