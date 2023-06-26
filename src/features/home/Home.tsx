import { Box, Container, Grid, Typography } from "@mui/material";

import Carousel from "../../common/Carousel";

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

const getBoxStyles = (heightPercentage: number) => ({
  width: "100%",
  height: `${heightPercentage}vh`,
  margin: "0 auto",
  backgroundColor: "secondary.main",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
});

function Home() {
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
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={getBoxStyles(20)} />
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={getBoxStyles(20)} />
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={getBoxStyles(20)} />
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
