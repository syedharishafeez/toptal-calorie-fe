import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import jwt from "jwt-decode";
import Container from "@material-ui/core/Container";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CheckIcon from "@material-ui/icons/Check";
import Grid from "@material-ui/core/Grid";
import { Switch, Route } from "react-router-dom";
import AddUserModal from "./AddCalorieModal";
import { makeRequest } from "./utils/apiRequest";
import { Button } from "@material-ui/core";
import WarnedCalories from "./WarnedCalories";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function ThisWeekVsLastWeek() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [formInitialValues, setFormInitialValues] = React.useState(false);
  const handleModalOpen = () => {
    setOpen(true);
  };
  const [editCalorieData, setEditCalorieData] = React.useState({
    name: "",
    value: "",
    time: new Date(),
    userId: "",
  });

  const [thisWeekCalories, setThisWeekCalories] = React.useState([]);

  const [lastWeekCalories, setLastWeekCalories] = React.useState([]);

  const [columns, setColumns] = React.useState([
    { title: "Name", field: "name" },
    { title: "Value", field: "value" },
    { title: "Time", field: "time" },
    { title: "User", field: "userId" },
    // {
    //   title: "Birth Place",
    //   field: "birthCity",
    //   lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
    // },
  ]);
  const [calorieData, setCalorieData] = React.useState([]);

  useEffect(() => {
    async function fetchCalories() {
      let res = await makeRequest({ method: "GET", url: "/report" });
      setThisWeekCalories(
        res?.data?.thisWeekCalories ? res?.data?.thisWeekCalories : []
      );
      setLastWeekCalories(
        res?.data?.lastWeekCalories ? res?.data?.lastWeekCalories : []
      );
    }
    fetchCalories();
  }, []);

  console.log("rerender");

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MaterialTable
              title="This Week"
              icons={{
                // Clear: (props) => <ClearIcon />,
                Search: (props) => <SearchIcon />,
                ResetSearch: (props) => <ClearIcon />,
                // Add: (props) => null,
                // Edit: (props) => {
                //   return <EditIcon />;
                // },
                SortArrow: (props) => null,
                // Delete: (props) => <DeleteIcon />,
                FirstPage: (props) => <FirstPageIcon />,
                LastPage: (props) => <LastPageIcon />,
                PreviousPage: (props) => <NavigateBeforeIcon />,
                NextPage: (props) => <NavigateNextIcon />,
                // Check: (props) => <CheckIcon />,
              }}
              columns={columns}
              data={thisWeekCalories}
              options={{
                headerStyle: {
                  backgroundColor: "#ebebeb",
                  color: "black",
                  pointerEvents: "none",
                },
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MaterialTable
              title="Last Week"
              icons={{
                // Clear: (props) => <ClearIcon />,
                Search: (props) => <SearchIcon />,
                ResetSearch: (props) => <ClearIcon />,
                // Add: (props) => null,
                // Edit: (props) => {
                //   return <EditIcon />;
                // },
                SortArrow: (props) => null,
                // Delete: (props) => <DeleteIcon />,
                FirstPage: (props) => <FirstPageIcon />,
                LastPage: (props) => <LastPageIcon />,
                PreviousPage: (props) => <NavigateBeforeIcon />,
                NextPage: (props) => <NavigateNextIcon />,
                // Check: (props) => <CheckIcon />,
              }}
              columns={columns}
              data={lastWeekCalories}
              options={{
                headerStyle: {
                  backgroundColor: "#ebebeb",
                  color: "black",
                  pointerEvents: "none",
                },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
