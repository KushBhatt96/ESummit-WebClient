import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  removeCartItem,
  updateCartItemQuantity,
  removeCartItemOffline,
  updateCartItemQuantityOffine,
} from "./CartSlice";
import { CartItem } from "../../models/CartItem";
import { selectIsLoggedIn } from "../auth/AuthSlice";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  cartItem: CartItem;
}

function CartListItem({ cartItem }: Props) {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { cartItemId, productId, product, quantity, totalPrice } = cartItem;

  const handleRemoveFromCart = () => {
    if (isLoggedIn) {
      dispatch(removeCartItem(cartItemId));
    } else {
      dispatch(removeCartItemOffline(productId));
    }
  };

  const handleQuantityChanged = (event: SelectChangeEvent<number>) => {
    const quantity = event.target.value as number;
    if (isLoggedIn) {
      dispatch(updateCartItemQuantity({ cartItemId, quantity }));
    } else {
      dispatch(updateCartItemQuantityOffine({ productId, quantity }));
    }
  };

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
            src={product.pictureUrl}
            style={{ height: "70%", width: "80%" }}
          />
        </Grid>
        <Grid item sm={9}>
          <Grid container padding={2} rowSpacing={1} columnSpacing={1}>
            <Grid item xs={12}>
              <Typography variant="h6">{product.name}</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-start">
              <Typography variant="body1" fontWeight="bold" marginRight={1}>
                {"Brand:"}
              </Typography>
              <Typography variant="body1">{product.brand}</Typography>
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
              <Typography variant="body1" fontWeight="bold" marginRight={1}>
                {"Type:"}
              </Typography>
              <Typography variant="body1">{product.type}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1">
                {`$${product.price.toFixed(2)}`}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={quantity}
                onChange={handleQuantityChanged}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1">
                {`$${totalPrice.toFixed(2)}`}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              {" "}
            </Grid>
            <Grid
              item
              xs={4}
              display="flex"
              justifyContent="flex-end"
              marginTop={5}
            >
              <IconButton onClick={handleRemoveFromCart}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CartListItem;
