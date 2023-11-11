import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { PropsWithChildren, useState } from "react";

interface Props {
  title: string;
}

function FilterBarSection({ title, children }: PropsWithChildren<Props>) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSetExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box>
      <Accordion expanded={isExpanded} elevation={0}>
        <AccordionSummary
          expandIcon={
            <IconButton onClick={handleSetExpanded}>
              <ExpandMore />
            </IconButton>
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography fontWeight={600}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default FilterBarSection;
