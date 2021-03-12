import NavHeader from "../components/NavHeader";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { useTheme } from "../theme";
import Reports from "../pages/Reports";
import Tenants from "../pages/Tenants";
import Dashboard from "../pages/Dashboard";
// import Home from "../pages/Home";
import Login from "../pages/Login";

function App() {
  const [currentTheme, setCurrentTheme] = useTheme();
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
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
