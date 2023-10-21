import { Box } from "@mui/material";
import { useState } from "react";
import { cursorTypes } from "./interfaces/CommonTypes";

interface Props {
  firstImage: string;
  secondImage: string;
  outerStyles: object;
  cursorType: cursorTypes;
}

function HoverImage({
  firstImage,
  secondImage,
  outerStyles,
  cursorType,
}: Props) {
  const [currentImage, setCurrentImage] = useState(firstImage);

  const handleEnter = () => {
    setCurrentImage(secondImage);
  };

  const handleLeave = () => {
    setCurrentImage(firstImage);
  };

  return (
    <Box
      component="img"
      src={currentImage}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      sx={{ ...outerStyles, cursor: cursorType }}
    ></Box>
  );
}

export default HoverImage;
