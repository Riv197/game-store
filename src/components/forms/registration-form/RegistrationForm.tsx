import React, { FC } from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import style from "../form.module.scss";
import FormInput from "../FormInput";
import { validateRegistrationForm } from "../validateForms";
import { BASE_URL } from "../../../utils";
import { AuthFormValues } from "../../../types/User";

const RegistrationForm: FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const onSubmit = async (values: AuthFormValues) => {
    try {
      const response = await axios.post(`${BASE_URL}/registration`, values);
      alert(response.data.message);
      handleClose();
    } catch (e) {
      console.error(e.response.data.message);
    }
  };

  return (
    <>
      <Button className={style.navButton} onClick={handleOpen}>
        Sign Up
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className={style.box}>
          <Typography className={style.title}>Registration</Typography>
          <Form
            onSubmit={onSubmit}
            validate={validateRegistrationForm}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form className={style.form} onSubmit={handleSubmit}>
                <div>
                  <label>Login</label>
                  <Field type="text" name="login" component={FormInput} placeholder="Login" />
                </div>
                <div>
                  <label>Password</label>
                  <Field type="password" name="password" component={FormInput} placeholder="Password" />
                </div>
                <div>
                  <label>Repeat password</label>
                  <Field<string> type="password" name="confirm" component={FormInput} placeholder="Repeat password" />
                </div>
                <div className={style.buttons}>
                  <button type="submit" disabled={submitting}>
                    Submit
                  </button>
                  <button type="button" onClick={() => form.reset} disabled={submitting || pristine}>
                    Reset
                  </button>
                </div>
              </form>
            )}
          />
        </Box>
      </Modal>
    </>
  );
};

export default RegistrationForm;
