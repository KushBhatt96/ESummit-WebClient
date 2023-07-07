import { useState, useEffect } from "react";
import { Container } from "@mui/material";

import { Product } from "../../models/Product";
import ProductList from "./ProductList";
import agent from "../../api/agent";
import Loading, { LoadingSizes } from "../../common/Loading";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import { fetchProducts, selectProducts } from "./ProductSlice";

function Catalog() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const productsStatus = useAppSelector((state) => state.product.status);

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productsStatus, dispatch]);
  // const [products, setProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function getProducts() {
  //     try {
  //       const data = await agent.Catalog.list();
  //       setProducts(data);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   getProducts();
  // }, []);

  if (productsStatus == "loading")
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
