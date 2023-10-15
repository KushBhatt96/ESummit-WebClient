import { Box, Button } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useState } from "react";

interface Slide {
  id: number;
  title: string;
  pictureUrl: string;
}

interface Props {
  slides: Slide[];
}

function Carousel({ slides }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderStyles = {
    height: "100%",
    position: "relative",
  };

  const slideStyles = {
    width: "100%",
    height: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${slides[currentIndex].pictureUrl})`,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    borderRadius: "5px",
  };

  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "50px",
    color: "white",
    zIndex: 1,
    cursor: "pointer",
    "&:hover": { color: "secondary.main" },
  };

  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "50px",
    color: "white",
    zIndex: 1,
    cursor: "pointer",
    "&:hover": { color: "secondary.main" },
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  return (
    <Box sx={sliderStyles}>
      <Box onClick={goToPrevious}>
        <KeyboardArrowLeft sx={leftArrowStyles} />
      </Box>
      <Box onClick={goToNext}>
        <KeyboardArrowRight sx={rightArrowStyles} />
      </Box>
      <Box
        sx={slideStyles}
        display="flex"
        justifyContent="center"
        alignItems="flex-end"
      ></Box>
    </Box>
  );
}

export default Carousel;
