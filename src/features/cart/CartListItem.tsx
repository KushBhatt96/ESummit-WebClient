import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState, KeyboardEvent } from "react";

import { useAppDispatch } from "../../app/Hooks";
import { Product } from "../../models/Product";
import { removeFromCart } from "./CartSlice";

interface Props {
  cartItem: Product;
}

function CartListItem({ cartItem }: Props) {
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [name, SetName] = useState("");

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(cartItem.id));
  };

  const handleQuantityChanged = (event: SelectChangeEvent<number>) => {
    setQuantity(event.target.value as number);
  };

  const handleColorChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    setColor(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Submitting!");
  };

  const handleNameEntered = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      alert(`Wassai ${name}`);
    }
  };

  return (
    <Paper elevation={5}>
      <form onSubmit={handleFormSubmit}>
        <select name="colors" id="color-select" onChange={handleColorChanged}>
          <option value="red">red</option>
          <option value="blue">blue</option>
          <option value="green">green</option>
        </select>
        <button>Click here!</button>
      </form>
      <p>Tell me your name! Press enter once done typing!</p>
      <div>{name}</div>
      <input
        type="text"
        onChange={(event) => SetName(event.target.value)}
        onKeyDown={handleNameEntered}
      ></input>
      <div>{color}</div>
      <Grid container>
        <Grid
          item
          sm={3}
          sx={{
            height: 250,
            width: 250,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={cartItem.pictureUrl}
            style={{ height: "80%", width: "80%" }}
          />
        </Grid>
        <Grid item sm={9}>
          <Grid container padding={2} rowSpacing={1} columnSpacing={1}>
            <Grid item xs={12}>
              <Typography variant="h6">{cartItem.name}</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-start">
              <Typography variant="body1" fontWeight="bold" marginRight={1}>
                {"Brand:"}
              </Typography>
              <Typography variant="body1">{cartItem.brand}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold">
                Item Price
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold">
                Quantity
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold">
                Total Price
              </Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-start">
              <Typography variant="body1" fontWeight="bold" marginRight={1}>
                {"Type:"}
              </Typography>
              <Typography variant="body1">{cartItem.type}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1">
                {`$${(cartItem.price / 100).toFixed(2)}`}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={quantity}
                onChange={handleQuantityChanged}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1">
                {`$${((cartItem.price * quantity) / 100).toFixed(2)}`}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              {" "}
            </Grid>
            <Grid
              item
              xs={4}
              display="flex"
              justifyContent="space-between"
              marginTop={5}
            >
              <Button variant="outlined">Edit</Button>
              <Button
                onClick={handleRemoveFromCart}
                variant="outlined"
                color="error"
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CartListItem;
