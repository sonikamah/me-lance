import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";



interface CustomTextInputProps {
  type: string;
  text: string;
  required: boolean;
  variant: "filled" | "standard" | "outlined";
  onChange: () => void;
  style?: {};
}

export const CustomTextInput = (props: CustomTextInputProps) => {
  const useStyles = makeStyles({
    inputLabel: {
      marginBottom: 14,
      fontSize: 13,
    },
    input: {
      padding: 0,
      color: '#000000',
      margin: 0,
      paddingLeft: 3,
      paddingBottom: 5,
      fontSize: 40,
      borderBottomColor: '#CCCCCC',
      borderBottomWidth: 1
    },
  });

  const styles = useStyles();
  return (
    <TextField
      className={styles.input}
      type={props.type}
      variant={props.variant}
      onChange={props.onChange}
      required={props.required}
      label={props.text}
      inputProps={{ 'aria-label': 'input field' }}
    />
  );
};
