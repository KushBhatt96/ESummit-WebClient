import { Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function NotFound() {
  return (
    <Container>
      <Typography variant="h2">404 Not Found</Typography>
    </Container>
  );
}

export default NotFound;
