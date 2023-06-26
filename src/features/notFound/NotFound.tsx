import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container component={Paper} sx={{ height: 400 }}>
      <Typography gutterBottom variant="h3">
        Oops - Not Found!
      </Typography>
      <Divider />
      <Button fullWidth component={Link} to="/catalog">
        Return to catalog
      </Button>
    </Container>
  );
}

export default NotFound;
