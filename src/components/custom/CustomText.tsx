import React from "react";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  defaultFontText: {
    fontFamily: "NotoSansKR-Regular",
    color: "#000000",
    includeFontPadding: false,
  },
});

interface CustomTextFieldProps {
  children: any;
  text: string;
  variant: "filled" | "standard" | "outlined";
  onChange: () => void;
  style?: {};
}

export const CustomTextField = (props: CustomTextFieldProps) => {
  const styles = useStyles();
  return (
    <TextField
      className={`${styles.defaultFontText} ${props.style}`}
      type="text"
      variant={props.variant}
      onChange={props.onChange}
    >
      {props.children}
    </TextField>
  );
};
