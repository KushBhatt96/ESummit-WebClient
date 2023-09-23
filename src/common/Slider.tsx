import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";

interface Slide {
  id: number;
  title: string;
  pictureUrl: string;
}

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
  const rightPositionLimit = numHiddenRight * -slideWidth;
  const leftPositionLimit = numHiddenLeft * slideWidth;
  const isHiddenSlidesOdd = hiddenSlides % 2 == 1;

  const [sliderPosition, setSliderPosition] = useState<number>(0);

  useEffect(() => {
    setSliderPosition(0);
  }, [isMediumOrGreater]);

  const slideStyle = {
    marginX: "1%",
    background: "white",
  };

  const slideStyleLeftMargin = {
    ...slideStyle,
    marginLeft: `${slideWidth + 1}%`,
  };

  const leftArrowStyles = {
    top: "50%",
    position: "relative",
    transform: "translate(0, -50%)",
    fontSize: "45px",
    color: "primary.main",
    zIndex: 1,
    cursor: "pointer",
    "&:hover": { color: "secondary.main" },
  };

  const rightArrowStyles = {
    top: "50%",
    position: "relative",
    transform: "translate(0, -50%)",
    fontSize: "45px",
    color: "primary.main",
    zIndex: 1,
    cursor: "pointer",
    "&:hover": { color: "secondary.main" },
  };

  const slideRight = () => {
    setSliderPosition((prevState) =>
      prevState > rightPositionLimit ? prevState - slideWidth : prevState
    );
  };

  const slideLeft = () => {
    setSliderPosition((prevState) =>
      prevState < leftPositionLimit ? prevState + slideWidth : prevState
    );
  };

  return (
    <>
      <Grid
        container
        position="relative"
        display="flex"
        justifyContent="center"
        flexWrap="nowrap"
      >
        <Grid item onClick={slideLeft}>
          <KeyboardArrowLeft sx={leftArrowStyles} />
        </Grid>
        <Grid
          item
          position="relative"
          width="100%"
          display="flex"
          justifyContent="center"
          overflow="hidden"
        >
          <Grid
            container
            position="relative"
            width="100%"
            display="flex"
            justifyContent="center"
            flexWrap="nowrap"
            sx={{
              transform: `translate(${sliderPosition}%, 0)`,
              transitionDuration: "0.5s",
            }}
          >
            {validatedSlides.map((slide, index) => (
              <Grid
                item
                key={slide.id}
                // 0.02 because that is 2 * 0.01, where 0.01 represents the 1% margin used in the slideStyle
                // TODO: simply math to make it easier to understand
                xs={((1 - numSlidesVisible * 0.02) * 12) / numSlidesVisible}
                md={((1 - numSlidesVisible * 0.02) * 12) / numSlidesVisible}
                component="img"
                src={slide.pictureUrl}
                sx={
                  isHiddenSlidesOdd && index == 0
                    ? slideStyleLeftMargin
                    : slideStyle
                }
              />
            ))}
          </Grid>
        </Grid>
        <Grid item onClick={slideRight}>
          <KeyboardArrowRight sx={rightArrowStyles} />
        </Grid>
      </Grid>
      {/* <Box display="flex" justifyContent="center">
        {slideStateArray.map((slideState, index) => {
          if (-slideState === sliderPosition) {
            return (
              <Typography key={index} color="black" fontSize="4rem">
                .
              </Typography>
            );
          }
          return (
            <Typography key={index} color="gray" fontSize="4rem">
              .
            </Typography>
          );
        })}
      </Box> */}
    </>
  );
}

export default Slider;
