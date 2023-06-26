import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Product } from "../../models/Product";
import agent from "../../api/agent";
import NotFound from "../notFound/NotFound";
import Loading, { LoadingSizes } from "../../common/Loading";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      // make the api call only if id is truthy (i.e. not undefined)
      if (id) {
        try {
          const data = await agent.Catalog.details(parseInt(id, 10));
          setProduct(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    }

    getProduct();
  }, [id]);

  if (loading)
    return (
      <Loading
        message="Loading product details..."
        size={LoadingSizes.MEDIUM}
      />
    );

  if (!product) {
    return <NotFound />;
  }

  return (
    <Container>
      <Grid container marginTop={6}>
        <Grid
          item
          xs={12}
          sm={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src={product.pictureUrl}
            alt={product.name}
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h3">{product.name}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h4" color="secondary">
            ${(product.price / 100).toFixed(2)}
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{product.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{product.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>{product.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Brand</TableCell>
                  <TableCell>{product.brand}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quantity in stock</TableCell>
                  <TableCell>{product.quantityInStock}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetail;
