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
        <Grid key={product.productId} item xs={6} sm={4} md={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
