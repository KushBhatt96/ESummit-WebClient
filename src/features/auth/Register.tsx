import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import Loading, { LoadingSizes } from "../../common/Loading";
import { useNavigate } from "react-router-dom";

import { RegisterDTO } from "../../models/RegisterDTO";
import { toast } from "react-toastify";
import axios from "axios";
import useForm from "../../common/hooks/useForm";

const baseUrl = "http://localhost:5119/api";

function Register() {
  const navigate = useNavigate();

  const {
    values,
    errors,
    handleChange,
    handleDateSelected,
    reset,
    isSubmitButtonDisabled,
  } = useForm();
  const { firstname, lastname, dateOfBirth, email, username, password } =
    values;

  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterSubmit = async () => {
    try {
      setIsLoading(() => true);

      const registrationInfo: RegisterDTO = {
        firstname,
        lastname,
        dateOfBirth,
        email,
        username,
        password,
      };
      const response = await axios.post(
        `${baseUrl}/Account/Register`,
        registrationInfo
      );

      setIsLoading(() => false);

      if (response.status === 201) {
        navigate("/login", { state: { isRegistered: true } });
      }
    } catch (error: any) {
      reset();
      toast.error(error.data.detail);
    } finally {
      setIsLoading(() => false);
    }
  };

  if (isLoading) {
    return (
      <Loading message="Registering new user..." size={LoadingSizes.MEDIUM} />
    );
  }

  return (
    <Grid container marginY="2rem">
      <Grid item xs={1} md={4} />
      <Grid
        item
        xs={10}
        md={4}
        boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        borderRadius="5px"
        component={Paper}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          paddingY="1rem"
          rowSpacing="1rem"
          component="form"
          onSubmit={handleRegisterSubmit}
        >
          <Grid item xs={12}>
            <Typography variant="h5">Create account</Typography>
          </Grid>
          <Grid item xs={12} width="90%">
            <TextField
              required
              id="outlined-required"
              color="secondary"
              label="First name"
              name="firstname"
              sx={{ width: "100%" }}
              onChange={handleChange}
              error={errors.firstname ? true : false}
              helperText={errors.firstname}
            />
          </Grid>
          <Grid item xs={12} width="90%">
            <TextField
              required
              id="outlined-required"
              color="secondary"
              label="Last name"
              name="lastname"
              sx={{ width: "100%" }}
              onChange={handleChange}
              error={errors.lastname ? true : false}
              helperText={errors.lastname}
            />
          </Grid>
          <Grid item xs={12} width="90%">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                label="Date of birth"
                onChange={(selectedDate) =>
                  handleDateSelected(selectedDate as Date)
                }
                sx={{
                  ".Mui-focused": {
                    color: "teal !important",
                  },
                  ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "teal !important",
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} width="90%">
            <TextField
              required
              id="outlined-required"
              color="secondary"
              label="Email"
              name="email"
              sx={{ width: "100%" }}
              onChange={handleChange}
              error={errors.email ? true : false}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} width="90%">
            <TextField
              required
              id="outlined-required"
              color="secondary"
              label="Username"
              name="username"
              sx={{ width: "100%" }}
              onChange={handleChange}
              error={errors.username ? true : false}
              helperText={errors.username}
            />
          </Grid>
          <Grid item xs={12} width="90%">
            <TextField
              required
              id="outlined-required"
              color="secondary"
              label="Password"
              name="password"
              type="password"
              sx={{ width: "100%" }}
              onChange={handleChange}
              error={errors.password ? true : false}
              helperText={errors.password}
            />
          </Grid>
          <Grid item xs={12} width="90%">
            <TextField
              required
              id="outlined-required"
              color="secondary"
              label="Re-enter password"
              name="reenterPassword"
              type="password"
              onChange={handleChange}
              sx={{ width: "100%" }}
              error={errors.reenterPassword ? true : false}
              helperText={errors.reenterPassword}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={isSubmitButtonDisabled()}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} md={4} />
    </Grid>
  );
}

export default Register;
