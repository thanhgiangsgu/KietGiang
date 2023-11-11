import React, { useState } from "react";
import { Space, Input, Button, Progress } from "antd";
import "./Account.css";
import toast from "react-hot-toast";
import axios from "axios";

const PasswordStrengthMeter = ({ password }) => {
  // Đánh giá mức độ mạnh của mật khẩu ở đây
  // Bạn có thể sử dụng các tiêu chí của riêng bạn để đánh giá mật khẩu
  const calculateStrength = (password) => {
    // Ví dụ: Kiểm tra độ dài của mật khẩu
    if (password.length < 6) {
      return 0;
    }

    // Ví dụ: Kiểm tra sự kết hợp của chữ cái, số và ký tự đặc biệt
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*]/.test(password);

    // Tính điểm dựa trên các tiêu chí
    let strength = 0;
    if (hasLetter) strength++;
    if (hasNumber) strength++;
    if (hasSpecialCharacter) strength++;

    return strength;
  };

  const strength = calculateStrength(password);

  return (
    <Progress
      percent={(strength / 3) * 100} // Điểm mạnh chia cho 3 để có giá trị từ 0-100
      status={strength === 3 ? "success" : "exception"}
      showInfo={false}
    />
  );
};

const ChangePass = () => {
  const user_id = localStorage.getItem("user_id");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeNewConfirmPassword = (e) => {
    setNewConfirmPassword(e.target.value);
  };

  const handleConfirmation = () => {
    console.log("Okay");
  };

  const handleSaveClick = async () => {
    const dataChangePassword = {
      user_id: user_id,
      password: password,
      newPassword: newPassword,
      newConfirmPassword: newConfirmPassword,
    };

    try {
      const res = await axios.patch(
        "http://localhost:3003/user/update-password",
        dataChangePassword
      );
      const errors = res.data.errors;
      if (errors.length > 0) {
        errors.map((error) => {
          toast.error(error, {
            position: "top-right",
          });
        });
      } else {
        toast
          .promise(
            // Thay thế bằng promise hoặc async function của bạn
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 3000); // Tạo một khoảng thời gian 1000ms (1 giây) trước khi hoàn thành promise
            }),
            {
              loading:
                "Đổi mật khẩu thành công, tự động đăng xuất trong vài giây nữa....",
              success: "Thành công!",
              error: "Lỗi!",
            },
            { position: "top-right" }
          )
          .then(() => {
            // Xử lý sau khi promise hoàn thành thành công
            // Xóa localStorage, tải lại trang, và thực hiện các tác vụ khác
            localStorage.removeItem("authToken");
            localStorage.removeItem("user_id");
            window.location.href = "/";
          })
          .catch((error) => {
            // Xử lý sau khi promise bị lỗi
            console.error(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Space direction="vertical">
      <h1 className="account-title">Thay đổi mật khẩu chính</h1>
      <div class="warning">
        <strong class="waring-title">CẢNH BÁO</strong>
        <p>
          Tiếp tục sẽ đăng xuất bạn ra khỏi phiên hiện tại, cần bạn phải đăng
          nhập lại. Những phiên trên các thiết bị khác sẽ tiếp tục có hiệu lực
          lên đến 1 tiếng.
        </p>
      </div>
      <div className="divider"></div>
      <Space direction="vertical">
        <Space style={{ width: "350px" }} direction="vertical">
          <h2>Mật khẩu chính hiện tại</h2>
          <Input
            name="password"
            value={password}
            onChange={handleChangePassword}
            type="password"
          />
        </Space>

        <Space direction="horizontal">
          <Space style={{ width: "350px" }} direction="vertical">
            <h2>Mật khẩu chính mới</h2>
            <Input
              name="newPassword"
              value={newPassword}
              onChange={handleChangeNewPassword}
              type="password"
            />
          </Space>
          <Space style={{ width: "350px" }} direction="vertical">
            <h2>Xác nhận mật khẩu chính mới</h2>
            <Input
              name="newConfirmPassword"
              value={newConfirmPassword}
              type="password"
              onChange={handleChangeNewConfirmPassword}
            />
          </Space>
        </Space>
        <PasswordStrengthMeter password={newPassword} />
      </Space>

      <div className="divider"></div>

      <Button onClick={handleSaveClick} type="primary">
        Thay đổi mật khẩu chính
      </Button>
    </Space>
  );
};

export default ChangePass;
