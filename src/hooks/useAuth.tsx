  import { useCallback } from 'react';
  import { useAppDispatch } from '../store/hooks';
  import { setAccessToken, setRefreshToken } from "../store/actions/auth";

  export default function useAuth() {
    const dispatch = useAppDispatch();
  
    const localSignUp = useCallback(
      async (signUpLocalRequest: any) => {
        // if (validateSignupInput(signUpLocalRequest)) {
          try {
            const response = await localSignUpMutation(
              signUpLocalRequest,
            ).unwrap();
  
            if (response && response.user && response.tokens) {
              const tokens = response.tokens;
              dispatch(setAccessToken(tokens.access?.token));
              dispatch(setRefreshToken(tokens.refresh?.token));
            //   dispatch(setUser(response.user));
            //   dispatch(setLoginType(AuthTypeEnum.LOCAL));
  
              /** Store in local async storage */
            //   await storeTokens(tokens);
            //   await storeUserData(response.user);
  
              return true;
            }
            return false;
          }
          catch (error) {
            return false;
          }
        // }
      },
      [],
    );
  
    const localSignIn = useCallback(
      async (signInLocalRequest: any) => {
        // if (validateLoginInput(signInLocalRequest)) {
  
          try {
            const response = await localSignInMutation(
              signInLocalRequest,
            ).unwrap();
  
            if (response && response.user && response.tokens) {
              const tokens = response.tokens;
  
              dispatch(setAccessToken(tokens.access?.token));
              dispatch(setRefreshToken(tokens.refresh?.token));
            //   dispatch(setUser(response.user));
            //   dispatch(setLoginType(AuthTypeEnum.LOCAL));
  
              /** Store in local async storage */
            //   await storeTokens(tokens);
            //   await storeUserData(response.user);
              return true;
            }
  
            return false;
          } catch (error) {
            return false;
          }
        // }
      },
      [],
    );
  
    return { localSignUp, localSignIn };
  }
  