import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Product } from "../../models/Product";

function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5119/api/products")
      .then((response) => response.json())
      .then((fetchedProducts: Product[]) => setProducts(fetchedProducts));
  }, []);

  const handleAddProduct = () => {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        name: `name${prevState.length + 1}`,
        description: `desc${prevState.length + 1}`,
        price: `price${prevState.length + 1}`,
        pictureUrl: "http://picsum.photos/200",
        brand: `brand${prevState.length + 1}`,
      },
    ]);
  };

  return (
    <>
      <Typography variant="h3">Catalog</Typography>
      <List>
        {products.map((product) => (
          <ListItem key={product.id}>
            <ListItemAvatar>
              <Avatar src={product.pictureUrl} />
            </ListItemAvatar>
            <ListItemText primary={`${product.name}-${product.price}`} />
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        type="submit"
        aria-label="submit"
        onClick={handleAddProduct}
      >
        Add Player
      </Button>
    </>
  );
}

export default Catalog;
