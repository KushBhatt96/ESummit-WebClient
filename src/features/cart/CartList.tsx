import { Divider, List, ListItem } from "@mui/material";
import { Product } from "../../models/Product";
import CartListItem from "./CartListItem";

interface Props {
  cartItems: Product[];
}

function CartList({ cartItems }: Props) {
  return (
    <List disablePadding>
      {cartItems.map((cartItem) => (
        <>
          <ListItem key={cartItem.id} sx={{ padding: 0, marginY: 2 }}>
            <CartListItem cartItem={cartItem} />
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  );
}

export default CartList;
