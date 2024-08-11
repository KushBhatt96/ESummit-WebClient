import {
  Alert,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading, { LoadingSizes } from "../../common/Loading";
import { loadCart } from "../cart/CartSlice";
import { useAppDispatch } from "../../app/hooks";
import { login } from "./AuthSlice";
import useForm, { FormField } from "../../common/hooks/useForm";

const baseUrl = "http://localhost:5119/api";

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const initialState: FormField[] = [
    { name: "username", value: "" },
    { name: "password", value: "" },
  ];
  const { getValues, handleChange, reset } = useForm(initialState);

  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(() => true);
      const loginInfo: any = getValues();
      const { data, status } = await axios.post(
        `${baseUrl}/Account/Login`,
        loginInfo,
        {
          withCredentials: true,
        }
      );
      if (status === 200) {
        dispatch(loadCart());
        dispatch(login(data));
        setIsLoading(() => false);
        navigate("/", { replace: true, state: { isLoggedIn: true } });
      }
    } catch (error: any) {
      reset();
      toast.error(error.data.detail);
    } finally {
      setIsLoading(() => false);
    }
  };

  if (isLoading) {
    return <Loading message="Logging in.." size={LoadingSizes.MEDIUM} />;
  }

  const values = getValues();

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
          onSubmit={handleLoginSubmit}
        >
          <Grid item xs={12} marginBottom="1rem">
            <Typography variant="h5">Login</Typography>
          </Grid>
          {state && state.isRegistered && (
            <Grid item xs={12} width="90%">
              <Alert severity="success">
                Registration successful. Please login below.
              </Alert>
            </Grid>
          )}
          <Grid item xs={12} width="90%">
            <TextField
              required
              id="outlined-required"
              color="secondary"
              label="Username"
              name="username"
              onChange={handleChange}
              fullWidth
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
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} marginTop="1rem">
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={!values.username || !values.password}
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

export default Login;
