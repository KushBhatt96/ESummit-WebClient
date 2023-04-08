import { useState, useEffect } from "react";
import { Button, Container } from "@mui/material";
import { Product } from "../../models/Product";
import ProductList from "./ProductList";

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
        price: prevState.length + 100,
        pictureUrl: "http://picsum.photos/200",
        brand: `brand${prevState.length + 1}`,
      },
    ]);
  };

  return (
    <Container>
      <ProductList products={products} />
      <Button
        variant="contained"
        type="submit"
        aria-label="submit"
        onClick={handleAddProduct}
      >
        Add Player
      </Button>
    </Container>
  );
}

export default Catalog;
