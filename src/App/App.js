import NavHeader from "../components/NavHeader";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { useTheme } from "../theme";
import Reports from "../pages/Reports";
import Tenants from "../pages/Tenants";
import Dashboard from "../pages/Dashboard";
import Directory from "../pages/Directory";
import TenantDashboard from "../pages/TenantDashboard";
// import Home from "../pages/Home";
import Login from "../pages/Login";
import useToken from "./useToken";
import RouteWrapper from "../components/RouteWrapper";

function App() {
  const [currentTheme, setCurrentTheme] = useTheme();

  const { token, setToken } = useToken();
  // Login page rendered each time there is not a stored user token
  // display <Login /> when token==false, pass in setToken function to Login component

  if (!token) {
    console.log(localStorage.getItem("roleId"));
    return <Login setToken={setToken} />;
  }

  // function roleValidation() {
  //   var isAuditor = false;
  //   if (localStorage.getItem("roleId") == "1") {
  //     isAuditor = true;
  //   }
  //   console.log(isAuditor);
  //   return isAuditor;
  // }
  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <Router>
          <div>
            <NavHeader
              currentTheme={currentTheme}
              setCurrentTheme={setCurrentTheme}
            />
            <Switch>
              <Route path="/reports">
                <Reports />
              </Route>
              <Route path="/tenants">
                <Tenants />
              </Route>
              <Route path="/directory">
                <Directory />
              </Route>
              <Route path="/" component={RouteWrapper}></Route>
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
