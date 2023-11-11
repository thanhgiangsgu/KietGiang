import { Button } from "antd";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineKey } from "react-icons/ai";
import { useLocation, useParams } from "react-router-dom";
import Ring from "../Ring";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmitPassword = () => {
    const dataResetPassword = {
      password: password,
      confirmPassword: confirmPassword,
      token: token,
    };
    console.log(dataResetPassword);
    axios
      .post("http://localhost:3003/user/reset-password", dataResetPassword)
      .then((response) => {
        console.log(response.data.message);
        if (response.data.message === "Success") {
          toast.success("Đăng nhập thành công");
          window.location.href = `/login`;
        } else {
          toast.error(response.data.message || "");
        }
      })
      .catch((error) => {
        console.log("Xảy ra lỗi gì đó ở Api");
      });
  };
  return (
    <div className="login-signin-container">
      <div className="header">
        <div className="text">Change Password</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {isLoading ? (
          <Ring />
        ) : (
          <>
            <div className="input">
              <AiOutlineKey className="icon" />
              <input
                type="text"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChangePassword}
              />
            </div>
            <div className="input">
              <AiOutlineKey className="icon" />
              <input
                type="password"
                placeholder="Password Confirm"
                name="password"
                value={confirmPassword}
                onChange={handleChangeConfirmPassword}
              />
            </div>
          </>
        )}
      </div>
      <Button
        style={{ width: "60%", margin: "30px auto" }}
        type="primary"
        onClick={handleSubmitPassword}
      >
        Reset Password
      </Button>
    </div>
  );
};

export default ChangePassword;
