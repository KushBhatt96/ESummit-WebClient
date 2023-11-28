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
    pictureUrl: "/images/products/womens_kubernetes_lightblue_top.png",
  },
  {
    id: 2,
    title: "slide 2",
    pictureUrl: "/images/products/womens_typescript_whitesmoke_top.png",
  },
  {
    id: 3,
    title: "slide 3",
    pictureUrl: "/images/products/mens_kubernetes_whitesmoke_bottom.png",
  },
  {
    id: 4,
    title: "slide 4",
    pictureUrl: "/images/products/mens_docker_pink_top.png",
  },
  {
    id: 5,
    title: "slide 5",
    pictureUrl: "/images/products/mens_csharp_whitesmoke_jacket.png",
  },
  {
    id: 6,
    title: "slide 6",
    pictureUrl: "/images/products/womens_react_grey_top.png",
  },
  {
    id: 7,
    title: "slide 7",
    pictureUrl: "/images/products/womens_redux_green_top.png",
  },
  {
    id: 8,
    title: "slide 8",
    pictureUrl: "/images/products/mens_react_black_jacket.png",
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
          <HoverImage
            firstImage="/images/woman_pink_shirt_action_picture.png"
            secondImage="/images/woman_pink_shirt_action_picture2.png"
            outerStyles={getBoxStyles(40)}
            cursorType="pointer"
          />
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <HoverImage
            firstImage="/images/mens_blue_shirt_action_photo_1.png"
            secondImage="/images/mens_blue_shirt_action_photo_2.png"
            outerStyles={getBoxStyles(40)}
            cursorType="pointer"
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <HoverImage
            firstImage="/images/white_jacket_action_photo1.png"
            secondImage="/images/black_jacket_action_photo1.png"
            outerStyles={getBoxStyles(40)}
            cursorType="pointer"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
