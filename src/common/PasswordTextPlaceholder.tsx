import { Box } from "@mui/material";

interface Props {
  textLength?: number;
}

function PasswordTextPlaceholder({ textLength = 12 }: Props) {
  const hiddenCharacterStyle = {
    background: "grey",
    height: "10px",
    width: "10px",
    borderRadius: "100%",
    marginRight: "5px",
  };
  return (
    <Box sx={{ display: "flex" }}>
      {[...Array(textLength)].map((value, index) => {
        return <Box key={index} sx={hiddenCharacterStyle} />;
      })}
    </Box>
  );
}

export default PasswordTextPlaceholder;
