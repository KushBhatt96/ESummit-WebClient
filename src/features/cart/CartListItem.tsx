import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Product } from "../../models/Product";

interface Props {
  cartItem: Product;
}

function CartListItem({ cartItem }: Props) {
  return (
    <Paper elevation={5}>
      <Grid container>
        <Grid
          item
          sm={3}
          sx={{
            height: 250,
            width: 250,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={cartItem.pictureUrl}
            style={{ height: "80%", width: "80%" }}
          />
        </Grid>
        <Grid item sm={9}>
          <Grid container padding={2} rowSpacing={1} columnSpacing={1}>
            <Grid item xs={12}>
              <Typography variant="h6">{cartItem.name}</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-start">
              <Typography variant="body1" fontWeight="bold">
                {"Brand:"}
              </Typography>
              <Typography variant="body1">{cartItem.brand}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold">
                Item Price
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold">
                Quantity
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold">
                Total Price
              </Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-start">
              <Typography variant="body1" fontWeight="bold">
                {"Type:"}
              </Typography>
              <Typography variant="body1">{cartItem.type}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1">{cartItem.price}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={1}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1">{cartItem.price}</Typography>
            </Grid>
            <Grid item xs={8}>
              {" "}
            </Grid>
            <Grid
              item
              xs={4}
              display="flex"
              justifyContent="space-between"
              marginTop={5}
            >
              <Button variant="outlined">Edit</Button>
              <Button variant="outlined" color="error">
                Remove
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CartListItem;
