import { Box, Container, Divider, Grid, Typography } from "@mui/material";

import OrderSummary from "./OrderSummary";
import CartList from "./CartList";

const sampleProducts = [
  {
    id: 1,
    name: "Angular Speedster Board 2000",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
    price: 20000,
    pictureUrl: "/images/products/sb-ang1.png",
    brand: "Angular",
    type: "Boards",
    quantityInStock: 100,
  },
  {
    id: 2,
    name: "Core Blue Hat",
    description:
      "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
    price: 1000,
    pictureUrl: "/images/products/hat-core1.png",
    brand: "NetCore",
    type: "Hats",
    quantityInStock: 100,
  },
];

function Cart() {
  return (
    <Container>
      <Grid container columnSpacing={6} rowSpacing={2}>
        <Grid item xs={12} sm={8.5}>
          <Typography variant="h4">Shopping Cart</Typography>
          <CartList cartItems={sampleProducts} />
        </Grid>
        <Grid item xs={12} sm={3.5}>
          <Typography variant="h4">Order Summary</Typography>
          <OrderSummary />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cart;
