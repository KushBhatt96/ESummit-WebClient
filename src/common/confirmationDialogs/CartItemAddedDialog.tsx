import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Product } from "../../models/Product";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  product: Product;
}

function CartItemAddedDialog({ isOpen, handleClose, product }: Props) {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Added to cart
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Grid container>
          <Grid item xs={4}>
            <img
              src={product.pictureUrl}
              style={{ height: "80%", width: "80%" }}
            />
          </Grid>
          <Grid item xs={8}>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <Typography variant="h5">{product.name}</Typography>
                  </TableRow>
                  <TableRow>
                    <strong>Brand:</strong>
                    {product.brand}
                  </TableRow>
                  <TableRow>
                    <strong>Type:</strong>
                    {product.type}
                  </TableRow>
                  <TableRow>
                    <strong>Price:</strong>
                    {product.price}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </DialogContent>
    </BootstrapDialog>
  );
}

export default CartItemAddedDialog;
