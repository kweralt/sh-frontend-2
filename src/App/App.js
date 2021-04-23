import NavHeader from "../components/NavHeader";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { useTheme } from "../theme";
import Reports from "../pages/Reports";
import Tenants from "../pages/Tenants";
import Dashboard from "../pages/Dashboard";
import Directory from "../pages/Directory";
import TenantActions from "../pages/TenantActions";
import TenantSubmission from "../components/TenantSubmission";
// import Home from "../pages/Home";
import Login from "../pages/Login";
import useToken from "./useToken";

function App() {
  const [currentTheme, setCurrentTheme] = useTheme();

  const { token, setToken } = useToken();
  // Login page rendered each time there is not a stored user token
  // display <Login /> when token==false, pass in setToken function to Login component
  if (!token) {
    return <Login setToken={setToken} />;
  }
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
              <Route path="/actions">
                <TenantActions/>
              </Route>
              <Route path="/tenants/submission">
                <TenantSubmission/>
              </Route>
              <Route path="/reports">
                <Reports />
              </Route>
              <Route path="/tenants">
                <Tenants />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/directory">
                <Directory/>
              </Route>
              {/* <Route path="/">
                <Login />
              </Route> */}
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
