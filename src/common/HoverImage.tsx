import { Box } from "@mui/material";
import { useState } from "react";

interface Props {
  firstImage: string;
  secondImage: string;
  outerStyles: object;
}

function HoverImage({ firstImage, secondImage, outerStyles }: Props) {
  const [currentImage, setCurrentImage] = useState(firstImage);

  const handleHover = () => {
    setCurrentImage((prevState) =>
      prevState === firstImage ? secondImage : firstImage
    );
  };

  return (
    <Box
      component="img"
      src={currentImage}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      sx={outerStyles}
    ></Box>
  );
}

export default HoverImage;
