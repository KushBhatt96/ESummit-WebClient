import { Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { ProblemDetails } from "../../models/ProblemDetails";

function ServerError() {
  const { state }: { state: ProblemDetails } = useLocation();

  return (
    <Container component={Paper}>
      {state && (
        <>
          <Typography gutterBottom variant="h3" color="secondary">
            {state.title}
          </Typography>
          <Divider />
          <Typography variant="body1">
            {/*We need the || because state.detail will be null when server is running in PROD*/}
            {state.detail || "Internal Server Error"}
          </Typography>
        </>
      )}
    </Container>
  );
}

export default ServerError;
