import React from "react";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const ExpandablePanel = ({
  id,
  title,
  subTitle,
  children,
  sx,
}: {
  id?: string;
  title: React.ReactNode | string;
  subTitle?: React.ReactNode | string;
  children: React.ReactNode;
  sx?: Object;
}) => {
  return (
    <Accordion
      sx={{
        width: "100%",

        "& .MuiAccordionSummary-content": {
          m: "24px 0",
        },
        "& .MuiAccordionDetails-root": {
          p: "unset",
        },
        "& .MuiButtonBase-root": {
          p: "unset",
        },

        ...sx,
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Stack spacing={1}>
          <Typography variant="h3">{title}</Typography>
          {subTitle && <Typography variant="subtitle2">{subTitle}</Typography>}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default ExpandablePanel;
