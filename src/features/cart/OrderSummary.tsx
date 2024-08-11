import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Paper,
} from "@mui/material";

import { useAppSelector } from "../../app/hooks";
import { selectCartItems } from "./CartSlice";

function OrderSummary() {
  const cartItems = useAppSelector(selectCartItems);

  const totalOrderCost = cartItems.reduce(
    (accumulator, item) => accumulator + item.totalPrice,
    0
  );

  return (
    <Paper sx={{ marginY: 2, padding: 1 }} elevation={5}>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Subtotal</TableCell>
              <TableCell>{`$${totalOrderCost.toFixed(2)}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Shipping</TableCell>
              <TableCell>FREE</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell>Calculated at checkout</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Estimated Total</TableCell>
              <TableCell
                sx={{ fontWeight: "bold" }}
              >{`$${totalOrderCost.toFixed(2)}`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="success"
        sx={{ marginBottom: 2, color: "white" }}
        fullWidth
      >
        CHECKOUT
      </Button>
      <Button variant="contained" color="info" fullWidth>
        PAYPAL
      </Button>
    </Paper>
  );
}

export default OrderSummary;
