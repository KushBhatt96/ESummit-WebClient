import React from "react";
import { Divider, List, ListItem } from "@mui/material";

import CartListItem from "./CartListItem";
import { CartItem } from "../../models/CartItem";

interface Props {
  cartItems: CartItem[];
}

function CartList({ cartItems }: Props) {
  const CartItemStyle = {
    padding: 0,
    marginY: 2,
  };

  return (
    <List disablePadding>
      {cartItems.map((cartItem, index) => (
        <React.Fragment key={cartItem.cartItemId}>
          <ListItem sx={CartItemStyle}>
            <CartListItem cartItem={cartItem} />
          </ListItem>
          {index != cartItems.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
}

export default CartList;
