import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import jwt from "jwt-decode";

import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { makeRequest } from "./utils/apiRequest";
import { Button, Container, TextField } from "@material-ui/core";

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

export default function InviteAFriend(props) {
  const classes = useStyles();
  let userToken =
    localStorage && localStorage.getItem("token")
      ? jwt(localStorage.getItem("token"))
      : {};

  let validationSchema = yup.object({
    name: yup.string().required("Enter a name"),
    email: yup.string().email("Invalid email format").required("Required"),
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
  });

  const handleClose = () => {
    props.setOpen(false);
    // props.setOpen({});
  };

  const submitForm = async (value, resetForm) => {
    console.log("values in submit form === ", value);
    // resetForm();

    let res = await makeRequest({
      method: "POST",
      url: `/invite-friend`,
      body: value,
    });
    if (res.status === 200) {
      resetForm();
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
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />{" "}
      <Container maxWidth="lg" className={classes.container}>
        <Formik
          // enableReinitialize
          initialValues={{
            name: "",
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            submitForm(values, resetForm);
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
                    label="Email"
                    variant="standard"
                    name="email"
                    id="email"
                    margin="normal"
                    value={values.email}
                    onChange={(onChangeValue) =>
                      formikProps.setFieldValue(
                        "email",
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
                  {errors.email && touched.email && (
                    <div classvalue="error" style={{ color: "red" }}>
                      {errors.email}
                    </div>
                  )}
                </div>
                {/* <h1>Sign in to continue</h1> */}
                <Button
                  type="submit"
                  variant="contained"
                  margin="normal"
                  // className={dirty && isValid ? "" : "disabled-btn"}
                  // disabled={!(dirty && isValid)}
                >
                  Done
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </main>
  );
}
