import "./App.css";
import Navbar from "./components/Navbar";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import toast, { Toaster, ToastProvider } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Warehouse from "./pages/Warehouse";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import Report from "./pages/Report";
import Login from "./pages/Login";
import Share from "./pages/Share";
import Register from "./pages/Register";
import axios from "axios";
import Account from "./pages/Account";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import ChangePassword from "./components/ChangePassword";
function App() {
  const [tokenEnabled, setTokenEnabled] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("authToken") || "";
    console.log(token);
    // Gọi API với token
    axios
      .get("http://localhost:3003/user/token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success("Dữ liệu token còn hợp lệ");
        setTokenEnabled(true);
      })
      .catch((error) => {
        // Xử lý lỗi, có thể kiểm tra mã trạng thái để xác định token có hợp lệ hay không
        if (error.response && error.response.status === 401) {
          // Token không hợp lệ, bạn có thể đưa người dùng về trang đăng nhập
        }
      });
  }, []);
  return (
    <BrowserRouter>
      <Navbar tokenEnabled={tokenEnabled} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/warehouse" element={<Warehouse id={"warehouse"} />} />
        <Route path="/share" element={<Share id={"upcoming"} />} />
        <Route path="/tools" element={<Tools id={"tools"} />} />
        <Route path="/report" element={<Report id={"contact"} />} />
        <Route path="/account" element={<Account id={"account"} />} />
        <Route
          path="/login"
          element={<LoginSignup id={"login"} tokenEnabled={tokenEnabled} />}
        />
        <Route path="/register" element={<Register id={"register"} />} />
        <Route
          path="/change-password"
          element={<ChangePassword id={"changePassword"} />}
        />
      </Routes>

      <Toaster />
    </BrowserRouter>
  );
}

export default App;
