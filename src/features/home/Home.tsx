import { Alert, Box, Container, Grid, Typography } from "@mui/material";

import Carousel from "../../common/Carousel";
import Slider from "../../common/Slider";
import { useState } from "react";
import { useLocation } from "react-router-dom";

interface Slide {
  id: number;
  title: string;
  pictureUrl: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "slide 1",
    pictureUrl: "/images/jeans.jpg",
  },
  {
    id: 2,
    title: "slide 2",
    pictureUrl: "/images/shirts.jpg",
  },
  {
    id: 3,
    title: "slide 3",
    pictureUrl: "/images/shoes.jpg",
  },
];

const containerStyles = {
  width: "100%",
  height: "50vh",
  margin: "0 auto",
};

function Home() {
  // Can add as many slides as required - ideally 10 max
  const [pictures, setPictures] = useState([
    {
      id: 1,
      title: "slide 1",
      pictureUrl: "/images/bluegreen_shoes.png",
    },
    {
      id: 2,
      title: "slide 2",
      pictureUrl: "/images/beige_scarf.png",
    },
    {
      id: 3,
      title: "slide 0",
      pictureUrl: "/images/black_shirt.png",
    },
    {
      id: 4,
      title: "slide 1",
      pictureUrl: "/images/teal_shirt.png",
    },
    {
      id: 5,
      title: "slide 0",
      pictureUrl: "/images/white_jacket.png",
    },
    {
      id: 6,
      title: "slide 1",
      pictureUrl: "/images/pink_shoes.png",
    },
  ]);

  const { state } = useLocation();

  const getBoxStyles = (heightPercentage: number) => ({
    width: "100%",
    height: `${heightPercentage}vh`,
    margin: "0 auto",
    backgroundColor: "secondary.main",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  });

  return (
    <Container>
      <Grid container spacing={4}>
        {state && state.isLoggedIn && (
          <Grid item xs={12}>
            <Alert severity="success">Login successful.</Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <Box sx={containerStyles}>
            <Carousel slides={slides} />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center", marginY: 6 }}
        >
          <Typography variant="h3">Popular Items</Typography>
        </Grid>
        <Grid item xs={12}>
          <Slider
            slides={pictures}
            numVisibleDesiredOnLarge={4}
            numVisibleDesiredOnSmall={2}
          />
        </Grid>
        <Grid
          item
          xs={8}
          sx={{ display: "flex", justifyContent: "center", marginTop: 6 }}
        >
          <Box
            sx={getBoxStyles(40)}
            component="img"
            src="/images/running_shoes.png"
          />
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ display: "flex", justifyContent: "center", marginTop: 6 }}
        >
          <Box
            sx={getBoxStyles(40)}
            component="img"
            src="/images/winter_jacket2.png"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center", marginY: 6 }}
        >
          <Box sx={getBoxStyles(40)} component="img" src="/images/scarf.jpg" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
