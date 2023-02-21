import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { attemptLogin as attemptLoginAction } from "../store/thunks/auth";
import { Error } from "../components";
import { Credentials } from "../store/actions/user";
import { useServerError } from "../hooks/useServerError";

type LoginFormValues = Credentials;

export const LoginPage = ({
  attemptLogin
}) => {
  const { serverError, handleServerError } = useServerError();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues: LoginFormValues = {
    identifier: "",
    password: "",
  };

  const validationSchema = Yup.object({
    identifier: Yup.string().min(3).max(50).required("Required"),
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

  const loginWithLocal = async (values: LoginFormValues) => {
    attemptLogin(values, navigate)
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(loginWithLocal)}>
        <div className="field">
          <label htmlFor="identifier">Username</label>
          <input
            {...register("identifier")}
            id="identifier"
            type="text"
            placeholder="Username"
          />
          {errors.identifier && <Error>{errors.identifier.message}</Error>}
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            id="password"
            type="password"
            placeholder="Password"
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </div>
        <div>
          <Link to="/login/forgot">Forgot your password?</Link>
        </div>

        <button type="submit">Login</button>
        {serverError && <Error>{serverError}</Error>}
      </form>
      <b>Or</b>
      <Link to="/register">Sign Up</Link>
    </div>
  );
}

// const mapStateToProps = state => ({
//   isAuth: state.user.isAuth
// });

const mapDispatchToProps = {
  attemptLogin: attemptLoginAction
};

export default connect(null, mapDispatchToProps)(LoginPage);


