import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";

import Carousel from "../../common/Carousel";
import { useState } from "react";

interface Slide {
  id: number;
  title: string;
  pictureUrl: string;
}

const slides = [
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
      pictureUrl: "/images/products/boot-core2.png",
    },
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
    {
      id: 5,
      title: "slide 5",
      pictureUrl: "/images/products/hat-core1.png",
    },
  ]);

  const [translation, setTranslation] = useState(0);

  const slideBoxStyles = (heightPercentage: number) => ({
    width: "18%",
    height: `${heightPercentage}vh`,
    margin: "0 1vh",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    transform: `translate(${translation}vh)`,
    transitionDuration: "0.75s",
  });

  const getBoxStyles = (heightPercentage: number) => ({
    width: "100%",
    height: `${heightPercentage}vh`,
    margin: "0 auto",
    backgroundColor: "secondary.main",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  });

  const handleScrollRight = () => {
    setTranslation((prevState) => prevState + 22);
  };

  const handleScrollLeft = () => {
    setTranslation((prevState) => prevState - 22);
  };

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
        <Grid item xs={12} display="flex" position="relative" overflow="hidden">
          <Box
            position="absolute"
            height="100%"
            width="25%"
            left="0px"
            zIndex={1}
            sx={{ background: "#E9E9E9" }}
            display="flex"
            justifyContent="center"
            alignContent="center"
          >
            <Button onClick={handleScrollLeft}>Left</Button>
          </Box>
          <Box display="flex">
            {pictures.map((picture) => (
              <img
                key={picture.id}
                style={slideBoxStyles(20)}
                src={`${picture.pictureUrl}`}
              />
            ))}
          </Box>
          <Box
            position="absolute"
            height="100%"
            width="25%"
            right="0px"
            zIndex={1}
            sx={{ background: "#E9E9E9" }}
            display="flex"
            justifyContent="center"
            alignContent="center"
          >
            <Button onClick={handleScrollRight}>Right</Button>
          </Box>
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
