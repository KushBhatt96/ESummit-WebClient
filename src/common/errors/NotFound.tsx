import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container>
      <Grid
        container
        component={Paper}
        elevation={5}
        justifyContent="center"
        rowSpacing={4}
        sx={{ marginY: "2rem", borderRadius: "5px" }}
      >
        <Grid item xs={12} display="flex" justifyContent="center">
          <Typography gutterBottom variant="h3">
            404 | Not Found
          </Typography>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center" height="50vh">
          <Box component="img" src="/images/hero1.jpg" width="100%" />
        </Grid>
        <Grid item xs={12}>
          <Button
            color="secondary"
            fullWidth
            component={Link}
            size="large"
            to="/catalog"
          >
            Return to catalog
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NotFound;
