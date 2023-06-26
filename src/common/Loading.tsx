import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

// Make the loading message and size options props
interface Props {
  message?: string;
  size?: LoadingSizes;
}

export enum LoadingSizes {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

const spinnerSizeMapping = {
  small: 30,
  medium: 60,
  large: 90,
};

const messageSizeMappng = {
  small: 15,
  medium: 30,
  large: 45,
};

function Loading({ message = "", size = LoadingSizes.MEDIUM }: Props) {
  return (
    <Backdrop open={true} invisible={true}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress color="secondary" size={spinnerSizeMapping[size]} />
        <Typography
          variant="h4"
          fontSize={messageSizeMappng[size]}
          sx={{ justifyContent: "center", position: "fixed", top: "60%" }}
          color="secondary"
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
}

export default Loading;
