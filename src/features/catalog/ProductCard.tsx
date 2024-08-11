import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Product } from "../../models/Product";
import {
  addToCart,
  addToCartOffline,
  selectCartItem,
  selectCartStatus,
} from "../cart/CartSlice";
import CartItemAddedDialog from "../../common/confirmationDialogs/CartItemAddedDialog";
import { useState } from "react";
import Cookies from "js-cookie";
import { selectIsLoggedIn } from "../auth/AuthSlice";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const { productId, name, pictureUrl, transitionPictureUrl, type, price } =
    product;
  const associatedCartItem = useAppSelector((state) =>
    selectCartItem(state, productId)
  );
  const cartStatus = useAppSelector(selectCartStatus);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [currentPicture, setCurrentPicture] = useState<string | undefined>(
    pictureUrl
  );

  const handleProductHoverIn = () => {
    setCurrentPicture(transitionPictureUrl);
  };

  const handleProductHoverOut = () => {
    setCurrentPicture(pictureUrl);
  };

  // TODO: Possibly make max quanity come from backend
  const handleAddToCart = () => {
    if (!associatedCartItem || associatedCartItem.quantity < 5) {
      if (isLoggedIn) {
        dispatch(addToCart(productId));
      } else {
        dispatch(addToCartOffline(product));
      }
      handleDialogOpen();
    } else {
      setIsAlertOpen(true);
    }
  };

  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const handleMaxAlertClose = () => {
    setIsAlertOpen(false);
  };

  const MaxQuantityAlert = (
    <Alert severity="error" color="error" onClose={handleMaxAlertClose}>
      Maximum quantity reached for item.
    </Alert>
  );

  return (
    <>
      <CartItemAddedDialog
        isOpen={isOpen}
        handleClose={handleDialogClose}
        product={product}
      />
      <Card sx={{ boxShadow: 4 }}>
        <CardMedia
          sx={{
            backgroundSize: "contain",
            bgcolor: "primary.light",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            //padding: "1rem",
          }}
          title={name}
        >
          <Box
            component="img"
            src={currentPicture}
            sx={{ width: "80%", height: "80%" }}
            onMouseEnter={handleProductHoverIn}
            onMouseLeave={handleProductHoverOut}
          />
        </CardMedia>
        <CardContent>
          <Box>
            <Typography gutterBottom fontWeight="bold" height="2.5rem">
              {name}
            </Typography>
            <Typography gutterBottom color="secondary" variant="h6">
              ${price.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {type}
            </Typography>
            {isAlertOpen && MaxQuantityAlert}
          </Box>
        </CardContent>
        <CardActions>
          <Button
            sx={{
              color: "text.primary",
              marginRight: 1,
            }}
            onClick={handleAddToCart}
            size="small"
            disabled={cartStatus == "loading" ? true : false}
          >
            Add to cart
          </Button>
          <Link to={`/catalog/${productId}`}>
            <Button sx={{ color: "text.primary" }} size="small">
              View
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
}

export default ProductCard;
