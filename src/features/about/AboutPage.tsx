import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";

import agent from "../../api/agent";
import { useNavigate } from "react-router-dom";

function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  // Here we are simulating catching of a validation error and displaying each validation error as a MUI Alert component in the jsx
  // Note that we are using useState hook for storing the validation errors
  const getValidationError = async () => {
    try {
      await agent.TestErrors.getValidationError();
    } catch (error) {
      if (Array.isArray(error)) {
        // Below, we are basically telling TS, "I know this is the right type, trust me"
        const knownError = error as string[];
        setValidationErrors(knownError);
      }
    }
  };

  const getServerError = async () => {
    try {
      await agent.TestErrors.get500Error();
    } catch (error) {
      const knownError = error as AxiosResponse;
      if (knownError.status === 500) {
        // along with navigation to /server-error page component, we can also pass some data to it
        // as the second argument --> { state: someDataHere }
        navigate("/server-error", { state: knownError.data });
      }
    }
  };

  return (
    <Container>
      <Typography gutterBottom variant="h2">
        Errors for testing purposes
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get400Error().catch((error: AxiosError) =>
              console.log(error)
            )
          }
        >
          Test 400 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get401Error().catch((error: AxiosError) =>
              console.log(error)
            )
          }
        >
          Test 401 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get404Error().catch((error: AxiosError) =>
              console.log(error)
            )
          }
        >
          Test 404 Error
        </Button>
        <Button variant="contained" onClick={getServerError}>
          Test 500 Error
        </Button>
        <Button variant="contained" onClick={getValidationError}>
          Test Validation Error
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}

export default AboutPage;
