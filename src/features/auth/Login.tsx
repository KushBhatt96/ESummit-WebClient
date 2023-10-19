import {
  Alert,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading, { LoadingSizes } from "../../common/Loading";
import Cookies from "js-cookie";
import { loadCart } from "../cart/CartSlice";
import { useAppDispatch } from "../../app/hooks";
import { login } from "./AuthSlice";

const baseUrl = "http://localhost:5119/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLoginSubmit = async () => {
    try {
      setIsLoading(() => true);
      const response = await axios.post(`${baseUrl}/Account/Login`, {
        username,
        password,
      });
      if (response.status === 200) {
        const cookieExpirationPeriod = new Date(
          new Date().getTime() + 5 * 60 * 1000
        );
        Cookies.set("jwt", response.data, { expires: cookieExpirationPeriod });
        dispatch(loadCart());
        dispatch(login());
        setIsLoading(() => false);
        navigate("/", { state: { isLoggedIn: true } });
      }
    } catch (error: any) {
      toast.error(error.data.detail);
    } finally {
      setIsLoading(() => false);
    }
  };

  if (isLoading) {
    return <Loading message="Logging in.." size={LoadingSizes.MEDIUM} />;
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
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} width="90%">
            <TextField
              required
              id="outlined-required"
              color="secondary"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} marginTop="1rem">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLoginSubmit}
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
