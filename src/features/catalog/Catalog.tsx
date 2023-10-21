import { useEffect } from "react";
import { Box, Container } from "@mui/material";

import ProductList from "./ProductList";
import Loading, { LoadingSizes } from "../../common/Loading";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProducts, selectProducts } from "./ProductSlice";

function Catalog() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const productsStatus = useAppSelector((state) => state.product.status);

  useEffect(() => {
    if (productsStatus === "idle") {
      // const jwt = Cookies.get("jwt");
      dispatch(fetchProducts());
    }
  }, [productsStatus, dispatch]); // TODO: determine why we must add dispatch to the useEffect dependency array

  if (productsStatus == "loading") {
    return (
      <Loading
        message="Loading product catalog..."
        size={LoadingSizes.MEDIUM}
      />
    );
  }

  return (
    <Container sx={{ marginY: "2rem" }}>
      <ProductList products={products} />
    </Container>
  );
}

export default Catalog;
