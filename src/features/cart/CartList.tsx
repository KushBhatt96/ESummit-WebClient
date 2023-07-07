import { Divider, List, ListItem } from "@mui/material";
import { Product } from "../../models/Product";
import CartListItem from "./CartListItem";
import React from "react";

interface Props {
  cartItems: Product[];
}

function CartList({ cartItems }: Props) {
  return (
    <List disablePadding>
      {cartItems.map((cartItem) => (
        <React.Fragment key={cartItem.id}>
          <ListItem sx={{ padding: 0, marginY: 2 }}>
            <CartListItem cartItem={cartItem} />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}

export default CartList;
