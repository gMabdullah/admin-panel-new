import React, { Ref } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  CardProps,
  CardHeaderProps,
  CardContentProps,
} from "@mui/material";

// project imports
import { KeyedObject } from "types";

// constant
const headerSX = {
  "& .MuiCardHeader-action": { mr: 0 },
  paddingTop: "26px !important",
  paddingLeft: "22px !important",
  paddingBottom: "unset",
  paddingRight: "24px !important",
  marginBottom: "26px",
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

export interface MainCardProps extends KeyedObject {
  border?: boolean;
  boxShadow?: boolean;
  children: React.ReactNode | string;
  style?: React.CSSProperties;
  content?: boolean;
  className?: string;
  contentClass?: string;
  contentSX?: CardContentProps["sx"];
  darkTitle?: boolean;
  sx?: CardProps["sx"];
  secondary?: CardHeaderProps["action"];
  shadow?: string;
  elevation?: number;
  title?: React.ReactNode | string;
}

const MainCard = React.forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = "",
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    }: MainCardProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          mt: "-5px",
          mb: "5px",
          border: border ? "1px solid" : "none",
          borderColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.default
              : theme.palette.primary[200] + 75,
          ":hover": {
            boxShadow: boxShadow
              ? shadow ||
                (theme.palette.mode === "dark"
                  ? "0 2px 14px 0 rgb(33 150 243 / 10%)"
                  : "0 2px 14px 0 rgb(32 40 45 / 8%)")
              : "inherit",
          },
          ...sx,
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader sx={headerSX} title={title} action={secondary} />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={headerSX}
            title={<Typography variant="h3">{title}</Typography>}
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && (
          <Divider
            sx={{
              marginRight: "24px !important",
              marginLeft: "22px !important",
              border: "1px solid #EEEEEE",
            }}
          />
        )}

        {/* card content */}
        {content && (
          <CardContent
            sx={{
              paddingTop: "unset ! important",
              paddingLeft: "22px !important",
              paddingBottom: "unset ! important",
              paddingRight: "23px !important",
              marginTop: "24px",
              ...contentSX,
            }}
            className={contentClass}
          >
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

export default MainCard;
