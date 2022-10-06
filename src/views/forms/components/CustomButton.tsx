import { Button } from "@mui/material";
import React from "react";

type FormButtonType<T extends React.ElementType> = {
  renderAs?: T;
  isLoading?: boolean;
  isCompleted?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  sx?: Object;
  variant: "text" | "outlined" | "contained";
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
  color?:
    | "inherit"
    | "secondary"
    | "primary"
    | "success"
    | "error"
    | "info"
    | "warning";
  size?: "small" | "medium" | "large";
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
} & React.ComponentPropsWithoutRef<T>;

const CustomButton = <T extends React.ElementType = "button">({
  renderAs,
  isLoading,
  isCompleted,
  children,
  variant,
  sx,
  style,
  color,
  size,
  ...rest
}: FormButtonType<T>): JSX.Element => {
  return (
    <Button
      as={renderAs}
      isLoading={isLoading}
      isCompleted={isCompleted}
      variant={variant}
      sx={{
        boxShadow: "unset",
        borderRadius: "8px",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
      style={style}
      color={color}
      size={size}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
