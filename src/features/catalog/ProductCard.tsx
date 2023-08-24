import {
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
import { addToCart, selectCartItem } from "../cart/CartSlice";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const { productId, name, pictureUrl, type, price } = product;
  const associatedCartItem = useAppSelector((state) =>
    selectCartItem(state, productId)
  );
  const dispatch = useAppDispatch();

  // TODO: Possibly make max quanity come from backend
  const handleAddToCart = () => {
    if (!associatedCartItem || associatedCartItem.quantity < 5) {
      dispatch(addToCart(productId));
    }
  };

  return (
    <Card sx={{ boxShadow: 4 }}>
      <CardMedia
        sx={{
          height: 300,
          backgroundSize: "contain",
          bgcolor: "primary.light",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        title={name}
      >
        <img src={pictureUrl} style={{ width: "80%", height: "80%" }} />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom fontWeight="bold">
          {name}
        </Typography>
        <Typography gutterBottom color="secondary" variant="h6">
          ${(price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{
            color: "action.active",
            marginRight: 1,
          }}
          onClick={handleAddToCart}
          size="small"
        >
          Add to cart
        </Button>
        <Link to={`/catalog/${productId}`}>
          <Button sx={{ color: "action.active" }} size="small">
            View
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
