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

const baseUrl = "http://localhost:5119/api";

function Register() {
  const navigate = useNavigate();

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassWord] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleDateSelected = (selectedDate: Date) => {
    setDateOfBirth(selectedDate.toISOString().split("T")[0]);
  };

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

  const handleIsSubmitDisabled = () => {
    if (
      !firstname ||
      !lastname ||
      !dateOfBirth ||
      !email ||
      !username ||
      !password ||
      !reenterPassword
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Grid container>
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
        >
          <Grid item xs={12}>
            <Typography variant="h5">Create account</Typography>
          </Grid>
          <Grid item xs={12} width="90%">
            <TextField
              required
              id="outlined-required"
              label="First name"
              sx={{ width: "100%" }}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} width="90%">
            <TextField
              required
              id="outlined-required"
              label="Last name"
              sx={{ width: "100%" }}
              onChange={(e) => setLastName(e.target.value)}
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
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} width="90%">
            <TextField
              required
              id="outlined-required"
              label="Email"
              sx={{ width: "100%" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} width="90%">
            <TextField
              required
              id="outlined-required"
              label="Username"
              sx={{ width: "100%" }}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} width="90%">
            <TextField
              required
              id="outlined-required"
              label="Password"
              type="password"
              sx={{ width: "100%" }}
              onChange={(e) => setPassWord(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} width="90%">
            <TextField
              required
              id="outlined-required"
              label="Re-enter password"
              type="password"
              onChange={(e) => setReenterPassword(e.target.value)}
              error={password != reenterPassword ? true : false}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleRegisterSubmit}
              disabled={handleIsSubmitDisabled()}
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
