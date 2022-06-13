import React from "react";
import jwt from "jwt-decode";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";

export const mainListItems = (props) => {
  let userToken =
    localStorage && localStorage.getItem("token")
      ? jwt(localStorage.getItem("token"))
      : {};

  return (
    <div>
      <ListItem
        button
        selected={window.location.pathname === "/calories"}
        onClick={() => {
          props.history.push("/calories");
        }}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Calories" />
      </ListItem>

      <ListItem
        button
        selected={window.location.href.includes("invite-a-friend")}
        onClick={() => {
          props.history.push("/invite-a-friend");
        }}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Invite A Friend" />
      </ListItem>

      {userToken?.role === "admin" && (
        <ListItem
          button
          selected={window.location.href.includes("this-week-vs-last-week")}
          onClick={() => {
            props.history.push("/this-week-vs-last-week");
          }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="This Week vs Last Week" />
        </ListItem>
      )}

      {userToken?.role === "admin" && (
        <ListItem
          button
          selected={window.location.href.includes("avg-calories-per-week")}
          onClick={() => {
            props.history.push("/avg-calories-per-week");
          }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Average Calories Per Week" />
        </ListItem>
      )}
    </div>
  );
};

export const secondaryListItems = () => {
  return (
    <div>
      <ListSubheader inset>Saved reports</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Current month" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last quarter" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Year-end sale" />
      </ListItem>
    </div>
  );
};
