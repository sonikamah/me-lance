import React, { useState } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifyOtp as verifyOtpAction } from "../store/thunks/auth";


const VerifyPhoneScreen = ({ verifyOtp }: any) => {
  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleVerifyOTP = async () => {
    const data = {
      type: "verify_phone",
      otp: "123456"
    }
    verifyOtp(data, navigate);
  };

  // const moveToLoggedScreen = async () => {
  //   navigate('/mainScreen');
  // };


  return (
    <div className="container">
      Enter Phone OTP
        <div className="field">
          <label htmlFor="number">OTP</label>
          <input id="number" type="number" placeholder="number" onChange={(text) => setOTP(text)}/>
        </div>

        <button onClick={handleVerifyOTP}>Verify OTP</button>
    </div>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     paddingLeft: 20,
//     paddingRight: 20,
//     paddingBottom: 71,
//   },
//   title: {
//     includeFontPadding: false,
//     fontSize: 15,
//     marginBottom: 10,
//   },
// });

const mapDispatchToProps = {
  verifyOtp: verifyOtpAction,
};

export default connect(null, mapDispatchToProps)(VerifyPhoneScreen);
