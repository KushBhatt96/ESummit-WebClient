import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
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
import NotFound from "../../common/errors/NotFound";
import Loading, { LoadingSizes } from "../../common/Loading";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState(true);
  const [isZoomedIntoProduct, setIsZoomedIntoProduct] = useState(false);

  useEffect(() => {
    async function getProduct() {
      // make the api call only if id is truthy (i.e. not undefined)
      if (id) {
        try {
          const data: Product = await agent.Catalog.details(parseInt(id, 10));
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

  const handleZoomIn = () => {
    setIsZoomedIntoProduct(true);
  };

  const handleZoomOut = () => {
    setIsZoomedIntoProduct(false);
  };

  if (isZoomedIntoProduct) {
    return (
      <Container
        sx={{
          marginY: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={product.pictureUrl}
          sx={{
            cursor: "zoom-out",
            background: "linear-gradient(#b2d8d8, #66b2b2)",
            borderRadius: "5px",
            "&:hover": { border: "2px #006666 solid" },
            marginY: "2rem",
            width: "100%",
          }}
          onClick={handleZoomOut}
        />
        <Box
          component="img"
          src={product.transitionPictureUrl}
          sx={{
            cursor: "zoom-out",
            background: "linear-gradient(#b2d8d8, #66b2b2)",
            borderRadius: "5px",
            "&:hover": { border: "2px #006666 solid" },
            width: "100%",
          }}
          onClick={handleZoomOut}
        />
      </Container>
    );
  }

  return (
    <Container sx={{ marginY: "2rem" }}>
      <Grid container columnSpacing={4}>
        <Grid
          item
          xs={12}
          sm={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            component="img"
            src={product.pictureUrl}
            alt={product.name}
            sx={{
              width: "100%",
              height: "100%",
              cursor: "zoom-in",
              background: "linear-gradient(#b2d8d8, #66b2b2)",
              borderRadius: "5px",
              "&:hover": { border: "2px #006666 solid" },
            }}
            onClick={handleZoomIn}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h3">{product.name}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h4" color="secondary">
            ${product.price.toFixed(2)}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Description</strong>
                  </TableCell>
                  <TableCell>{product.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Type</strong>
                  </TableCell>
                  <TableCell>{product.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Brand</strong>
                  </TableCell>
                  <TableCell>{product.brand}</TableCell>
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
