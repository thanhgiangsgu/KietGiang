import React, { useEffect, useState } from "react";
import "./LoginSignup.css";
import ForgotPassword from "./ForgotPassword";
import LoginSignupInputs from "./LoginSignupInputs";
const LoginSignup = () => {
  const [action, setAction] = useState("Login");

  useEffect(() => {}, [action]);

  const updateAction = (newAction) => {
    setAction(newAction);
  };

  const handleLoginClick = () => {
    if (action === "Sign Up") {
      setAction("Login");
    } else {
      console.log("Handle Login");
    }
  };

  const handleSignUpClick = () => {
    if (action === "Login") {
      setAction("Sign Up");
    } else {
      console.log("Handle Sign Up");
    }
  };

  const handleForgotPassword = () => {
    setAction("Forgot Password");
    console.log(action);
  };

  return (
    <div className="login-signin-container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      {action === "Forgot Password" ? (
        // Render nội dung khi action là 'forgotPassword'
        <ForgotPassword action={action} updateAction={updateAction} />
      ) : (
        <>
          <LoginSignupInputs action={action} />
          <div className="forgot-password">
            Lost Password?{" "}
            <span onClick={handleForgotPassword}>Click Here!</span>
          </div>

          <div className="submit-container">
            <div
              onClick={handleSignUpClick}
              className={action === "Login" ? "submit gray mt-60" : "submit"}
            >
              Sign Up
            </div>
            <div
              onClick={handleLoginClick}
              className={action === "Sign Up" ? "submit gray" : "submit  mt-60"}
            >
              Login
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginSignup;
