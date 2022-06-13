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

export default function Calories() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [formInitialValues, setFormInitialValues] = React.useState(false);
  const handleModalOpen = () => {
    setOpen(true);
  };
  debugger;
  let userToken = localStorage ? jwt(localStorage.getItem("token")) : {};
  const [editCalorieData, setEditCalorieData] = React.useState({
    name: "",
    value: "",
    time: new Date(),
    userId: "",
  });

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
      let res = await makeRequest({ method: "GET", url: "/calorie" });
      setCalorieData(res.data);
    }
    fetchCalories();
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              type="submit"
              style={{ float: "right" }}
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleModalOpen}
            >
              Add Calorie
            </Button>

            <AddUserModal
              open={open}
              setOpen={setOpen}
              editCalorieData={editCalorieData}
              calorieData={calorieData}
              setCalorieData={setCalorieData}
              formInitialValues={
                userToken.role === "admin"
                  ? {
                      name: editCalorieData.name,
                      value: editCalorieData.value,
                      time: new Date(editCalorieData.time),
                      userId: editCalorieData.userId,
                    }
                  : {
                      name: editCalorieData.name,
                      value: editCalorieData.value,
                      time: new Date(editCalorieData.time),
                    }
              }
              isEdit={isEdit}
            />
          </Grid>
          <Grid item xs={12}>
            <MaterialTable
              title="Calories"
              actions={[
                {
                  icon: (props) => {
                    return <EditIcon />;
                  },
                  tooltip: "Edit Data",
                  onClick: (event, rowData) => {
                    setIsEdit(true);
                    setEditCalorieData({ ...rowData });
                    setOpen(true);
                  },
                },
              ]}
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
              columns={columns}
              data={calorieData}
              options={{
                headerStyle: {
                  backgroundColor: "#ebebeb",
                  color: "black",
                  pointerEvents: "none",
                },
              }}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                      // setState((prevState) => {
                      //   const data = [...prevState.data];
                      //   data.push(newData);
                      //   return { ...prevState, data };
                      // });
                    }, 600);
                  }),
                // onRowUpdate: (newData, oldData) =>
                //   new Promise((resolve) => {
                //     setTimeout(() => {
                //       resolve();
                //       if (oldData) {
                //         // setState((prevState) => {
                //         //   const data = [...prevState.data];
                //         //   data[data.indexOf(oldData)] = newData;
                //         //   return { ...prevState, data };
                //         // });
                //       }
                //     }, 600);
                //   }),
                onRowDelete: async (oldData) => {
                  return await (async function () {
                    debugger;
                    let res = await makeRequest({
                      method: "DELETE",
                      url: `/calorie/${oldData._id}`,
                    });
                    debugger;
                    let finalizedCalories = calorieData.filter(
                      (item) => item._id !== oldData._id
                    );
                    setCalorieData(finalizedCalories);
                  })();

                  // return new Promise((resolve) => {
                  //   setTimeout(() => {
                  //     resolve();
                  //     // setState((prevState) => {
                  //     //   const data = [...prevState.data];
                  //     //   data.splice(data.indexOf(oldData), 1);
                  //     //   return { ...prevState, data };
                  //     // });
                  //   }, 600);
                  // })
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <WarnedCalories calorieData={calorieData} />
        </Grid>
        {/* <AddUserModal
          open={open}
          setOpen={setOpen}
          editCalorieData={editCalorieData}
          setCalorieData={setCalorieData}
          formInitialValues={{
            name: editCalorieData.name,
            value: editCalorieData.value,
            time: new Date(editCalorieData.time),
          }}
          isEdit={true}
        /> */}
      </Container>
    </main>
  );
}
