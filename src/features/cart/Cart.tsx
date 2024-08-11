import { Button, Container, Grid, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import OrderSummary from "./OrderSummary";
import CartList from "./CartList";
import { clearCart, clearCartOffline, selectCartItems } from "./CartSlice";
import Loading, { LoadingSizes } from "../../common/Loading";
import { selectIsLoggedIn } from "../auth/AuthSlice";

function Cart() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const cartItems = useAppSelector(selectCartItems);
  if (!cartItems) {
    return (
      <Loading
        message="Loading product catalog..."
        size={LoadingSizes.MEDIUM}
      />
    );
  }

  const handleClear = () => {
    if (isLoggedIn) {
      dispatch(clearCart());
    } else {
      dispatch(clearCartOffline());
    }
  };

  return (
    <Container sx={{ marginY: "2rem" }}>
      <Grid container columnSpacing={6} rowSpacing={2}>
        <Grid item xs={12} md={8.5}>
          <Typography variant="h4">Shopping Cart</Typography>
          <CartList cartItems={cartItems} />
          {cartItems.length > 0 && (
            <Button
              variant="contained"
              onClick={handleClear}
              sx={{ marginTop: "1rem" }}
            >
              Clear
            </Button>
          )}
        </Grid>
        <Grid item xs={12} md={3.5}>
          <Typography variant="h4">Order Summary</Typography>
          <OrderSummary />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cart;
