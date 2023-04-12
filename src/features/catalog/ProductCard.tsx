import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../models/Product";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const { id, name, pictureUrl, type, price } = product;

  return (
    <Card sx={{ boxShadow: 4 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={name}
        titleTypographyProps={{
          sx: {
            fontWeight: "bold",
            color: "primary.main",
          },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "primary.light",
        }}
        image={pictureUrl}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          ${(price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
        <Link to={`/catalog/${id}`}>
          <Button size="small">View</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
