import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
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
import { calorieThreshold } from "./Constant";
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

export default function WarnedCalories(props) {
  const classes = useStyles();
  const [columns, setColumns] = useState([
    { title: "Date", field: "date" },
    { title: "Total Calorie", field: "totalCalorie" },
  ]);
  const [perDayCalories, setPerDayCalories] = useState([]);

  useEffect(() => {
    if (props.calorieData && props.calorieData.length) {
      let totalAccumulatedCalorie = props.calorieData.reduce((acc, item) => {
        debugger;
        let splitDate = item.time.split("T");
        if (acc[splitDate[0]]) {
          acc[splitDate[0]] = acc[splitDate[0]] + item.value;
        } else {
          acc[splitDate[0]] = item.value;
        }
        return acc;
      }, {});
      debugger;
      let dateAndCalorie = Object.entries(totalAccumulatedCalorie)?.map(
        (item) => {
          return { date: item[0], totalCalorie: item[1] };
        }
      );
      setPerDayCalories(dateAndCalorie);
    }
  }, [props.calorieData]);

  return (
    <Grid item xs={12}>
      <MaterialTable
        title="Calories per day"
        columns={columns}
        data={perDayCalories}
        icons={{
          Clear: (props) => <ClearIcon />,
          Search: (props) => <SearchIcon />,
          ResetSearch: (props) => <ClearIcon />,
          Add: (props) => null,
          Edit: (props) => {
            return <EditIcon />;
          },
          SortArrow: (props) => null,
          Delete: (props) => <DeleteIcon />,
          FirstPage: (props) => <FirstPageIcon />,
          LastPage: (props) => <LastPageIcon />,
          PreviousPage: (props) => <NavigateBeforeIcon />,
          NextPage: (props) => <NavigateNextIcon />,
          Check: (props) => <CheckIcon />,
        }}
        options={{
          headerStyle: {
            backgroundColor: "#ebebeb",
            color: "black",
            pointerEvents: "none",
          },
          rowStyle: (rowData) => {
            if (rowData.totalCalorie > calorieThreshold) {
              return { backgroundColor: "yellow" };
            }
            return {};
          },
        }}
      />
    </Grid>
  );
}
