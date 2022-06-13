import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import jwt from "jwt-decode";
import Fade from "@material-ui/core/Fade";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  TextField,
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useEffect } from "react";
import { makeRequest } from "./utils/apiRequest";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "white",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    color: "white",
    boxShadow: theme.shadows[5],
  },
}));

export default function AddCalorieModal(props) {
  const classes = useStyles();
  let userToken =
    localStorage && localStorage.getItem("token")
      ? jwt(localStorage.getItem("token"))
      : {};

  let validationSchema = yup.object({
    time: yup.date().nullable("Enter a time"),
    value: yup.string().required("Enter a value"),
    name: yup.string().required("Enter a name"),
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
    value: "",
    time: new Date(),
  });

  const handleClose = () => {
    props.setOpen(false);
    // props.setOpen({});
  };

  const submitForm = async (value) => {
    console.log("values in submit form === ", value);
    // resetForm();
    if (props.isEdit) {
      let res = await makeRequest({
        method: "PUT",
        url: `/calorie/${props.editCalorieData._id}`,
        body: value,
      });
      let updatedCalorieData = props.calorieData.map((item) => {
        if (item._id === res.data._id) {
          return res.data;
        } else {
          return item;
        }
      });
      debugger;
      props.setCalorieData(updatedCalorieData);
      props.setOpen(false);
    } else {
      let res = await makeRequest({
        method: "POST",
        url: `/calorie`,
        body: value,
      });
      debugger;
      props.setCalorieData([...props.calorieData, { ...res.data }]);
      props.setOpen(false);
    }
  };

  // useEffect(() => {
  //   if (props.isEdit) {
  //     setInitialValues({
  //       name: props.editCalorieData.name,
  //       value: props.editCalorieData.value,
  //       time: new Date(props.editCalorieData.time),
  //     });
  //   }
  // }, []);

  return (
    <div>
      <Dialog
        disableBackdropClick={true}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <DialogTitle style={{ backgroundColor: "#3f51b5" }}>
              <Typography variant="h5" gutterBottom style={{ color: "white" }}>
                {props.isEdit ? "Edit Calorie" : "Add Calorie"}
              </Typography>
              {/* <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton> */}
            </DialogTitle>
            <DialogContent>
              <Container>
                <Formik
                  // enableReinitialize
                  initialValues={props.formInitialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, { resetForm }) => {
                    submitForm(values);
                  }}
                >
                  {(formikProps) => {
                    const {
                      values,
                      handleChange,
                      handleSubmit,
                      errors,
                      touched,
                      handleBlur,
                      isValid,
                      dirty,
                    } = formikProps;

                    return (
                      <Form xs={12} md={12} lg={12}>
                        <div className="form-control">
                          <TextField
                            label="Name"
                            variant="standard"
                            name="name"
                            id="name"
                            margin="normal"
                            value={values.name}
                            onChange={(onChangeValue) =>
                              formikProps.setFieldValue(
                                "name",
                                onChangeValue.target.value
                              )
                            }
                            onBlur={handleBlur}
                            // className={
                            //   errors.name && touched.name
                            //     ? "input-error"
                            //     : null
                            // }
                          />
                          {errors.name && touched.name && (
                            <div className="error" style={{ color: "red" }}>
                              {errors.name}
                            </div>
                          )}
                        </div>
                        <div>
                          <TextField
                            label="Value"
                            variant="standard"
                            name="value"
                            id="value"
                            margin="normal"
                            value={values.value}
                            onChange={(onChangeValue) =>
                              formikProps.setFieldValue(
                                "value",
                                onChangeValue.target.value
                              )
                            }
                            onBlur={handleBlur}
                            // classvalue={
                            //   errors.value && touched.value
                            //     ? "input-error"
                            //     : null
                            // }
                          />
                          {errors.value && touched.value && (
                            <div classvalue="error" style={{ color: "red" }}>
                              {errors.value}
                            </div>
                          )}
                        </div>
                        {/* <h1>Sign in to continue</h1> */}
                        <div>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              id="date-picker-dialog"
                              label="Time"
                              inputVariant="standard"
                              format="MM/dd/yyyy"
                              margin="normal"
                              value={values.time}
                              defaultValue={values.time}
                              onChange={(onChangeValue) =>
                                formikProps.setFieldValue("time", onChangeValue)
                              }
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </MuiPickersUtilsProvider>
                          {errors.date && touched.date && (
                            <div className="error" style={{ color: "red" }}>
                              {errors.date}
                            </div>
                          )}
                        </div>
                        {userToken?.role === "admin" && (
                          <div>
                            <TextField
                              label="User"
                              variant="standard"
                              name="userId"
                              id="userId"
                              margin="normal"
                              value={values.userId}
                              onChange={(onChangeValue) =>
                                formikProps.setFieldValue(
                                  "userId",
                                  onChangeValue.target.value
                                )
                              }
                              onBlur={handleBlur}
                              // classvalue={
                              //   errors.value && touched.value
                              //     ? "input-error"
                              //     : null
                              // }
                            />
                            {errors.userId && touched.userId && (
                              <div classvalue="error" style={{ color: "red" }}>
                                {errors.userId}
                              </div>
                            )}
                          </div>
                        )}
                        <Button
                          type="submit"
                          variant="contained"
                          margin="normal"
                          // className={dirty && isValid ? "" : "disabled-btn"}
                          // disabled={!(dirty && isValid)}
                        >
                          Done
                        </Button>

                        <Button
                          variant="contained"
                          margin="normal"
                          onClick={() => {
                            formikProps.resetForm();
                            props.setOpen(false);
                          }}
                          // className={dirty && isValid ? "" : "disabled-btn"}
                          // disabled={!(dirty && isValid)}
                        >
                          Cancel
                        </Button>
                      </Form>
                    );
                  }}
                </Formik>
              </Container>
            </DialogContent>
          </div>
        </Fade>
      </Dialog>
    </div>
  );
}
