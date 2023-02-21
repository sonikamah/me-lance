import React,  {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../store/hooks";
import { setAccessToken, setRefreshToken } from "../store/actions/auth";

export default function MainScreen() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [userInfo, setUserInfo] = useState();


  useEffect(() => {

    const retrieveUser = () => {
      try {
        const user = localStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          setUserInfo(parsedUser);
          if (parsedUser.username) {
            setUsername(parsedUser.username);
          } else {
            setUsername(parsedUser.firstName);
          }
          // dispatch(setUser(parsedUser));
          if (parsedUser && !parsedUser.isEmailVerified) {
            navigate("/verifyEmailScreen") //'VerifyEmailScreen');
          } else if (!parsedUser.phone) {
            navigate("/addPhoneScreen")//AddPhoneScreen');
          } else if (!parsedUser.isPhoneVerified) {
            navigate("/verifyPhoneScreen")//'VerifyPhoneScreen');
          } else if (!parsedUser.username) {
            navigate("/setPasswordScreen")//'SetPasswordScreen');
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    retrieveUser();
    const retrieveToken = () => {
      try {
        const tokens = localStorage.getItem('tokens');
        if (tokens) {
          const parsedTokens = JSON.parse(tokens);
          // setRefreshTokenMain(parsedTokens.refresh?.token);
          dispatch(setAccessToken(parsedTokens.access?.token));
          dispatch(setRefreshToken(parsedTokens.refresh?.token));
          // dispatch(setLoginType(AuthTypeEnum.LOCAL));
        }
      } catch (error) {
        console.error(error);
      }
    };
    retrieveToken();
  }, []);

  return (
    <div className='container'>
      Welcome, Main Screen after Login  {username}
    </div>
  );
}
