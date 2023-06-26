import { useState, useEffect } from "react";
import { Container } from "@mui/material";

import { Product } from "../../models/Product";
import ProductList from "./ProductList";
import agent from "../../api/agent";
import Loading, { LoadingSizes } from "../../common/Loading";

function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const data = await agent.Catalog.list();
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

  if (loading)
    return (
      <Loading
        message="Loading product catalog..."
        size={LoadingSizes.MEDIUM}
      />
    );

  return (
    <Container>
      <ProductList products={products} />
    </Container>
  );
}

export default Catalog;
