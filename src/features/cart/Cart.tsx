import { Container, Grid, Typography } from "@mui/material";

import { useAppSelector } from "../../app/hooks";
import OrderSummary from "./OrderSummary";
import CartList from "./CartList";
import { selectCartItems } from "./CartSlice";
import Loading, { LoadingSizes } from "../../common/Loading";

function Cart() {
  const cartItems = useAppSelector(selectCartItems);
  if (!cartItems) {
    return (
      <Loading
        message="Loading product catalog..."
        size={LoadingSizes.MEDIUM}
      />
    );
  }

  return (
    <Container>
      <Grid container columnSpacing={6} rowSpacing={2}>
        <Grid item xs={12} md={8.5}>
          <Typography variant="h4">Shopping Cart</Typography>
          <CartList cartItems={cartItems} />
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
