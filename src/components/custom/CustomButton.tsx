import React from "react";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

interface CustomButtonProps {
  variant: "text" | "outlined" | "contained" | undefined;
  text: string;
  disabled: boolean;
  onPress: () => void;
  style?: {};
}

const useStyles = makeStyles({
  buttonEnabled: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    includeFontPadding: false,
    fontFamily: "NotoSansKR-Regular",
    height: 46,
    backgroundColor: "#2670F6",
  },
  buttonDisabled: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    includeFontPadding: false,
    fontFamily: "NotoSansKR-Regular",
    height: 46,
    backgroundColor: "#EEEEEE",
  },
  textEnabled: {
    color: "#ffffff",
  },
  textDisabled: {
    color: "#D2D2D2",
  },
});

export const CustomButton = (props: CustomButtonProps) => {
  const styles = useStyles();
  return (
    <Button
      className={props.disabled ? styles.buttonDisabled : styles.buttonEnabled}
      variant={props.variant}
    >
      <span
        className={props.disabled ? styles.textDisabled : styles.textEnabled}
      >
        {props.text}
      </span>
    </Button>
  );
};
