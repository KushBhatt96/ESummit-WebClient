import { Alert, Box, Container, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import HoverImage from "../../common/HoverImage";
import Carousel from "../../common/Carousel";
import Slider from "../../common/Slider";
import { Slide } from "../../common/interfaces/CommonInterfaces";

const carouselSlides: Slide[] = [
  {
    id: 1,
    title: "Jeans",
    pictureUrl: "/images/jeans.jpg",
  },
  {
    id: 2,
    title: "Shirts",
    pictureUrl: "/images/shirts.jpg",
  },
  {
    id: 3,
    title: "Shoes",
    pictureUrl: "/images/shoes.jpg",
  },
];

const sliderSlides: Slide[] = [
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
    title: "slide 3",
    pictureUrl: "/images/black_shirt.png",
  },
  {
    id: 4,
    title: "slide 4",
    pictureUrl: "/images/teal_shirt.png",
  },
  {
    id: 5,
    title: "slide 5",
    pictureUrl: "/images/white_jacket.png",
  },
  {
    id: 6,
    title: "slide 6",
    pictureUrl: "/images/pink_shoes.png",
  },
  {
    id: 7,
    title: "slide 7",
    pictureUrl: "/images/bluegreen_shoes.png",
  },
  {
    id: 8,
    title: "slide 8",
    pictureUrl: "/images/beige_scarf.png",
  },
];

function Home() {
  const { state } = useLocation();

  const getBoxStyles = (heightPercentage: number) => ({
    width: "100%",
    height: `${heightPercentage}vh`,
    boxShadow:
      "0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: "5px",
  });

  return (
    <Container sx={{ marginY: "2rem" }}>
      <Grid container spacing={6}>
        {state && state.isLoggedIn && (
          <Grid item xs={12}>
            <Alert severity="success">Login successful.</Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <Carousel slides={carouselSlides} outerStyles={getBoxStyles(50)} />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h3" fontWeight="500">
            Popular Items
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Slider
            slides={sliderSlides}
            numVisibleDesiredOnLarge={4}
            numVisibleDesiredOnSmall={2}
            cursorType="pointer"
          />
        </Grid>
        <Grid item xs={8} sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={getBoxStyles(40)}
            component="img"
            src="/images/running_shoes.png"
          />
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <HoverImage
            firstImage="/images/winter_jacket.png"
            secondImage="/images/winter_jacket2.png"
            outerStyles={getBoxStyles(40)}
            cursorType="pointer"
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={getBoxStyles(40)} component="img" src="/images/scarf.jpg" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
