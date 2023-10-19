import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { Slide } from "./interfaces/CommonInterfaces";

interface Props {
  slides: Slide[];
  numVisibleDesiredOnLarge: number;
  numVisibleDesiredOnSmall: number;
}

function Slider({
  slides,
  numVisibleDesiredOnLarge,
  numVisibleDesiredOnSmall,
}: Props) {
  const theme = useTheme();
  const isMediumOrGreater = useMediaQuery(theme.breakpoints.up("md"));
  const validatedSlides = slides.slice(0, 20);
  const numSlidesTotal = validatedSlides.length;
  const numVisibleByScreenSize = isMediumOrGreater
    ? numVisibleDesiredOnLarge
    : numVisibleDesiredOnSmall;
  const numSlidesVisible =
    numVisibleByScreenSize > numSlidesTotal
      ? numSlidesTotal
      : numVisibleByScreenSize;
  const hiddenSlides = numSlidesTotal - numSlidesVisible;
  const slideWidth = 100 / numSlidesVisible;
  const numHiddenRight = Math.round(hiddenSlides / 2);
  const numHiddenLeft = hiddenSlides - numHiddenRight;
  const leftPositionLimit = numHiddenRight * -slideWidth;
  const rightPositionLimit = numHiddenLeft * slideWidth;
  const isHiddenSlidesOdd = hiddenSlides % 2 == 1;
  const slideMarginX = 0.01;

  const [sliderPosition, setSliderPosition] = useState(0);

  useEffect(() => {
    setSliderPosition(0);
  }, [isMediumOrGreater]);

  const slideStyle = {
    marginX: `${slideMarginX * 100}%`,
    borderRadius: "15px",
  };

  const arrowStyles = (translateX: number, translateY: number) => ({
    top: "50%",
    position: "absolute",
    transform: `translate(${translateX}%, ${translateY}%)`,
    fontSize: "60px",
    cursor: "pointer",
    "&:hover": { color: "secondary.main" },
  });

  const revealRight = () => {
    setSliderPosition((prevState) =>
      prevState > leftPositionLimit ? prevState - slideWidth : prevState
    );
  };

  const revealLeft = () => {
    setSliderPosition((prevState) =>
      prevState < rightPositionLimit ? prevState + slideWidth : prevState
    );
  };

  return (
    <Grid container position="relative">
      <Grid item onClick={revealLeft}>
        <KeyboardArrowLeft sx={arrowStyles(-100, -50)} />
      </Grid>
      <Grid item position="relative" width="100%" overflow="hidden">
        <Grid
          container
          position="relative"
          width="100%"
          justifyContent="center"
          flexWrap="nowrap"
          sx={{
            transform: `translate(${sliderPosition}%, 0)`,
            transitionDuration: "0.5s",
            marginLeft: isHiddenSlidesOdd ? `${slideWidth / 2}%` : 0,
          }}
        >
          {validatedSlides.map((slide) => (
            <Grid
              item
              key={slide.id}
              // Firstly calcuate the percentage of space that is occupied by the visible slides. Note that the remaining space is taken up by the slideMarginX.
              // Multiply that calcuated percentage by 12 (because 12 is the total number of columsn in flexbox)
              // Divide the resulting number (should be less than 12) by the number of visible slides
              // This results in the number of flexbox columns occupied by each slide
              xs={
                ((1 - numSlidesVisible * 2 * slideMarginX) * 12) /
                numSlidesVisible
              }
              md={
                ((1 - numSlidesVisible * 2 * slideMarginX) * 12) /
                numSlidesVisible
              }
              component="img"
              src={slide.pictureUrl}
              sx={slideStyle}
            />
          ))}
        </Grid>
      </Grid>
      <Grid item onClick={revealRight}>
        <KeyboardArrowRight sx={arrowStyles(0, -50)} />
      </Grid>
    </Grid>
  );
}

export default Slider;
