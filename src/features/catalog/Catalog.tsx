import { useState, useEffect } from "react";
import { Button, Container } from "@mui/material";
import axios from "axios";
import { Product } from "../../models/Product";
import ProductList from "./ProductList";

function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:5119/api/products"
        );
        const { data } = response;
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
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
    </Container>
  );
}

export default Catalog;
