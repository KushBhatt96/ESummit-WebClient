import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { ChangeEvent } from "react";

interface Props {
  options: string[];
  optionsSelected: string[];
  handleSelected: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FilterBarTextOptions({
  options,
  optionsSelected,
  handleSelected,
}: Props) {
  return (
    <FormGroup>
      {options &&
        options.map((option, index) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                name={option}
                checked={optionsSelected.includes(option)}
                onChange={handleSelected}
              />
            }
            label={options[index]}
          />
        ))}
    </FormGroup>
  );
}

export function FilterBarColorOptions({
  options,
  optionsSelected,
  handleSelected,
}: Props) {
  return (
    <>
      {options &&
        options.map((option) => (
          <Checkbox
            key={option}
            name={option}
            checked={optionsSelected.includes(option)}
            onChange={handleSelected}
            icon={<CircleIcon sx={{ color: `${option}` }} />}
            checkedIcon={
              <CircleIcon
                sx={{
                  color: `${option}`,
                  border: "2px solid teal",
                  borderRadius: "100%",
                }}
              />
            }
          />
        ))}
    </>
  );
}
