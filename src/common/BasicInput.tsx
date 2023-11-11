import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { PropsWithChildren } from "react";

interface Props {
  label: string;
  value: string | undefined;
  handleChange: (e: SelectChangeEvent) => void;
  outerStyles: object;
}

function BasicInput({
  label,
  value,
  handleChange,
  children,
  outerStyles,
}: PropsWithChildren<Props>) {
  return (
    <FormControl fullWidth sx={outerStyles}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={handleChange}
      >
        {children}
      </Select>
    </FormControl>
  );
}

export default BasicInput;
