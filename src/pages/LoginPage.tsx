import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { attemptLogin } from "../store/thunks/auth";
import { Error } from "../components";
import { Credentials } from "../store/actions/user";
import { useAppDispatch } from "../store/hooks";
import { useServerError } from "../hooks/useServerError";
import { CustomButton } from "../components/custom/CustomButton";
import { CustomTextInput } from "../components/custom/CustomTextInput";
import { makeStyles } from "@material-ui/core/styles";

type LoginFormValues = Credentials;

const useStyles = makeStyles({
  container: {
    // position: "relative",
    background: "#241332",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 38,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 71,
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // color: "#ffffff",
    // padding: theme.spacing(2),
    "& .MuiTextField-root": {
      // margin: theme.spacing(1),
      width: "500px",
      height: "50px",
      // background: '#241332',
      // color: "#ffffff"
    },
    "& .MuiButtonBase-root": {
      // margin: theme.spacing(2),
    },
  },
  title: {
    fontSize: 19,
    paddingBottom: 56,
  },
  signUpText: {
    includeFontPadding: false,
    fontFamily: "NotoSansKR-Regular",
    marginTop: 14,
    fontSize: 13,
    textAlign: "center",
    color: "#898888",
  },
  socialDescriptionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  socialDescriptionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  socialDescriptionText: {
    paddingLeft: 10,
    paddingRight: 10,
    includeFontPadding: false,
    fontFamily: "NotoSansKR-Regular",
    color: "#D2D2D2",
    fontSize: 13,
  },
  socialLoginButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
  },
  socialLogo: {
    width: 19,
    height: 19,
  },
  socialText: {
    paddingLeft: 10,
    includeFontPadding: false,
    fontFamily: "NotoSansKR-Regular",
    fontSize: 14,
  },
});

export default function LoginPage() {
  const styles = useStyles();
  const { serverError, handleServerError } = useServerError();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValues: LoginFormValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(3).max(50).required("Required"),
    password: Yup.string().min(5).max(255).required("Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values: LoginFormValues) => {
    dispatch(attemptLogin(values, navigate)).catch(handleServerError);
  };

  return (
    <div className={styles.container}>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <CustomTextInput
            variant="filled"
            onChange={() => {}}
            required={true}
            text="Username"
            type="text"
          />
          {errors.username && <Error>{errors.username.message}</Error>}
        </div>
        <div className="field">
          <CustomTextInput
            variant="filled"
            onChange={() => {}}
            required={true}
            type="password"
            text="Password"
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </div>

        <CustomButton
          text="Login"
          variant={"contained"}
          disabled={false}
          onPress={() => {}}
        />
        {serverError && <Error>{serverError}</Error>}
      </form>
      {/* <Link to="/register">Sign Up</Link> */}
      <hr />
      <CustomButton
        text="Sign up"
        variant={"contained"}
        disabled={false}
        onPress={() => {}}
        style={styles.socialLoginButton}
      />
    </div>
  );
}
