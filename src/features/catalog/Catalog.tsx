import { ChangeEvent, useEffect } from "react";
import {
  Container,
  Grid,
  MenuItem,
  Pagination,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import ProductList from "./ProductList";
import Loading, { LoadingSizes } from "../../common/Loading";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  filterProducts,
  pageProducts,
  selectProducts,
  setOrderBy,
  setPageNumber,
  sortProducts,
} from "./ProductSlice";
import BasicInput from "../../common/BasicInput";
import CatalogFilterBar from "./filter/CatalogFilterBar";

function Catalog() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const orderBy = useAppSelector((state) => state.product.orderBy);
  const productsStatus = useAppSelector((state) => state.product.status);
  const currentPage = useAppSelector((state) => state.product.pageNumber);
  const pageCount = useAppSelector((state) => state.product.pageCount);
  const sexSelected = useAppSelector((state) => state.product.selectedSex);

  const handleSorting = (e: SelectChangeEvent) => {
    dispatch(setOrderBy(e.target.value));
    dispatch(sortProducts());
  };

  const handlePageChange = (e: ChangeEvent<unknown>, page: number) => {
    if (page != currentPage) {
      dispatch(setPageNumber(page));
      dispatch(pageProducts());
    }
  };

  useEffect(() => {
    if (productsStatus !== "loading") {
      dispatch(filterProducts());
    }
  }, [dispatch]); // TODO: determine why we must add dispatch to the useEffect dependency array

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
      <Grid container spacing={4}>
        <Grid item display="flex" xs={3}>
          <Typography variant="h3">
            {sexSelected != "Men" && sexSelected != "Women"
              ? "All"
              : sexSelected}
          </Typography>
        </Grid>
        <Grid item xs={9} display="flex" justifyContent="flex-end">
          <BasicInput
            label="Sort By: "
            value={orderBy}
            handleChange={handleSorting}
            outerStyles={{
              background: "primary",
              width: "30%",
            }}
          >
            <MenuItem value="alphabetical">Alphabetical Order</MenuItem>
            <MenuItem value="price">{"Price (Lowest to Highest)"}</MenuItem>
            <MenuItem value="priceDesc">{"Price (Highest to Lowest)"}</MenuItem>
          </BasicInput>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <CatalogFilterBar />
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <ProductList products={products} />
        </Grid>
        <Grid item display="flex" justifyContent="flex-end" xs={12}>
          <Pagination
            count={pageCount}
            page={currentPage}
            shape="rounded"
            onChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Catalog;
