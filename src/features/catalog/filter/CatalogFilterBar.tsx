import { Box, Divider, Paper } from "@mui/material";
import FilterBarSection from "./FilterBarSection";
import {
  FilterBarTextOptions,
  FilterBarColorOptions,
} from "./FilterBarSectionOptions";
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  addBrandFilter,
  addColorFilter,
  addTypeFilter,
  filterProducts,
  removeBrandFilter,
  removeColorFilter,
  removeTypeFilter,
} from "../ProductSlice";

function CatalogFilterBar() {
  const dispatch = useAppDispatch();
  const productColors = useAppSelector((state) => state.product.colors);
  const productTypes = useAppSelector((state) => state.product.types);
  const productBrands = useAppSelector((state) => state.product.brands);

  const selectedColors = useAppSelector(
    (state) => state.product.selectedColors
  );
  const selectedTypes = useAppSelector((state) => state.product.selectedTypes);
  const selectedBrands = useAppSelector(
    (state) => state.product.selectedBrands
  );

  const handleColorSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(addColorFilter(e.target.name));
      dispatch(filterProducts());
    } else {
      dispatch(removeColorFilter(e.target.name));
      dispatch(filterProducts());
    }
  };

  const handleTypeSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(addTypeFilter(e.target.name));
      dispatch(filterProducts());
    } else {
      dispatch(removeTypeFilter(e.target.name));
      dispatch(filterProducts());
    }
  };

  const handleBrandSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(addBrandFilter(e.target.name));
      dispatch(filterProducts());
    } else {
      dispatch(removeBrandFilter(e.target.name));
      dispatch(filterProducts());
    }
  };

  return (
    <Box component={Paper} elevation={5}>
      <FilterBarSection title="Color">
        <FilterBarColorOptions
          options={productColors}
          handleSelected={handleColorSelected}
          optionsSelected={selectedColors}
        />
      </FilterBarSection>
      <Divider />
      <FilterBarSection title="Type">
        <FilterBarTextOptions
          options={productTypes}
          handleSelected={handleTypeSelected}
          optionsSelected={selectedTypes}
        />
      </FilterBarSection>
      <Divider />
      <FilterBarSection title="Brand">
        <FilterBarTextOptions
          options={productBrands}
          handleSelected={handleBrandSelected}
          optionsSelected={selectedBrands}
        />
      </FilterBarSection>
    </Box>
  );
}

export default CatalogFilterBar;
