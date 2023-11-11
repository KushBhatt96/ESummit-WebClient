import { Grid } from "@mui/material";
import { Product } from "../../models/Product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

function ProductList({ products }: Props) {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid key={product.productId} item xs={12} sm={6} md={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
