import React from "react";

import { Button, SvgIconTypeMap } from "@mui/material";

import {
  DefaultComponentProps,
  OverridableTypeMap,
  OverrideProps,
} from "@mui/material/OverridableComponent";

export interface OverridableComponent<M extends OverridableTypeMap> {
  <C extends React.ElementType>(
    props: { component?: C } & OverrideProps<M, C>
  ): JSX.Element;
  (props: DefaultComponentProps<M>): JSX.Element;
}

type FormButtonType<T extends React.ElementType> = {
  renderAs?: T;
  isLoading?: boolean;
  isCompleted?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  sx?: Object;
  variant?: "text" | "outlined" | "contained";
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
  startIcon?:
    | React.ReactElement
    | (OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
      });
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
  disabled,
  onClick,
  ...rest
}: FormButtonType<T>): JSX.Element => {
  return (
    <Button
      as={renderAs}
      isloading={isLoading}
      iscompleted={isCompleted}
      variant={variant}
      onClick={onClick}
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
      disabled={disabled}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
