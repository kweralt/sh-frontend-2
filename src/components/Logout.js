import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
    IconButton,
  } from "@material-ui/core";
import {
    PowerSettingsNew,
  } from "@material-ui/icons";
import App from "../App/App";
class Logout extends Component {
    state = {navigate: false};
    logout = () => {
        sessionStorage.clear("token");
        this.setState({navigate: true});
        window.location.reload(false);
    }
    render() {
        let { navigate } = this.state;
        while(navigate){
            return <Redirect to="/" push={true} component={App}/>;
        }
        return (
            <IconButton onClick={this.logout} color="inherit" edge="end" to={"/"}>
                <PowerSettingsNew fontSize="small"/>
            </IconButton>
        )
    }
}
export default Logout;