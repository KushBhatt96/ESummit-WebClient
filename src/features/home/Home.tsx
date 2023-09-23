import { Box, Container, Grid, Typography } from "@mui/material";

import Carousel from "../../common/Carousel";
import Slider from "../../common/Slider";
import { useState } from "react";

interface Slide {
  id: number;
  title: string;
  pictureUrl: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "slide 1",
    pictureUrl: "/images/tv.JPG",
  },
  {
    id: 2,
    title: "slide 2",
    pictureUrl: "/images/laptop.JPG",
  },
  {
    id: 3,
    title: "slide 3",
    pictureUrl: "/images/gaming.JPG",
  },
];

const containerStyles = {
  width: "100%",
  height: "40vh",
  margin: "0 auto",
};

function Home() {
  const [pictures, setPictures] = useState([
    {
      id: 0,
      title: "slide 0",
      pictureUrl: "/images/products/boot-ang1.png",
    },
    {
      id: 1,
      title: "slide 1",
      pictureUrl: "/images/products/boot-redis1.png",
    },
    {
      id: 2,
      title: "slide 2",
      pictureUrl: "/images/products/glove-code1.png",
    },
    {
      id: 3,
      title: "slide 0",
      pictureUrl: "/images/products/boot-ang1.png",
    },
    {
      id: 4,
      title: "slide 1",
      pictureUrl: "/images/products/boot-redis1.png",
    },
    {
      id: 5,
      title: "slide 0",
      pictureUrl: "/images/products/boot-ang1.png",
    },
    {
      id: 6,
      title: "slide 1",
      pictureUrl: "/images/products/boot-redis1.png",
    },
    {
      id: 7,
      title: "slide 1",
      pictureUrl: "/images/products/boot-redis1.png",
    },
  ]);

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
          <Typography variant="h2">Popular Categories</Typography>
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
          <Box sx={getBoxStyles(40)} />
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ display: "flex", justifyContent: "center", marginTop: 6 }}
        >
          <Box sx={getBoxStyles(40)} />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center", marginY: 6 }}
        >
          <Box sx={getBoxStyles(20)} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
