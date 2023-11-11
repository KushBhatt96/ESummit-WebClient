import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import { Slide } from "./interfaces/CommonInterfaces";
import { teal } from "@mui/material/colors";

interface Props {
  slides: Slide[];
  outerStyles: object;
}

function Carousel({ slides, outerStyles }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timerID = setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % slides.length);
    }, 5000);

    return () => {
      clearTimeout(timerID);
    };
  }, [currentIndex]);

  const innerStyles = {
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${slides[currentIndex].pictureUrl})`,
    "&:hover": { border: `5px ${teal[400]} solid` },
    cursor: "pointer",
  };

  return <Box sx={{ ...innerStyles, ...outerStyles }} />;
}

export default Carousel;
