import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Paper,
} from "@mui/material";

function OrderSummary() {
  return (
    <Paper sx={{ marginY: 2, padding: 1 }} elevation={5}>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Subtotal</TableCell>
              <TableCell>$200.00</TableCell>
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
              <TableCell sx={{ fontWeight: "bold" }}>$200.00 USD</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        sx={{ marginBottom: 2, background: "#40BF82" }}
        fullWidth
      >
        CHECKOUT
      </Button>
      <Button variant="contained" color="secondary" fullWidth>
        PAYPAL
      </Button>
    </Paper>
  );
}

export default OrderSummary;
