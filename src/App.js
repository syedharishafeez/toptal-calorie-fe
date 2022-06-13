import React from "react";
import "./App.css";
import DrawerMenu from "./DrawerMenu";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import withWidth from "@material-ui/core/withWidth";

function App({ props }) {
  return (
    // <div className="App">
    //   {/* <Login /> */}
    //   <Dashboard />
    // </div>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={DrawerMenu} />
      </Switch>
    </BrowserRouter>
  );
}

function NotificationOverlay(props) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <App props={{ ...props }} />
    </SnackbarProvider>
  );
}

export default withWidth()(NotificationOverlay);
