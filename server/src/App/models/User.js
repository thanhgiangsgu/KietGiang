const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },

  // 2FA (Xác thực hai yếu tố)
  twoFactorToken: { type: String }, // Mã token 2FA (ví dụ: mã QR code)
  twoFactorEnabled: { type: Boolean, default: false }, // Trạng thái xác thực 2FA

  // Thời gian tạo tài khoản
  createDate: { type: Date, default: Date.now },

  // Thời gian đăng nhập gần đây
  lastLogin: { type: Date },

  // Quyền hạn (ví dụ: roles - admin/user)
  roles: [{ type: String }],

  // Xác thực email
  emailVerified: { type: Boolean, default: false }, // Trạng thái xác thực email
  emailVerificationToken: { type: String }, // Mã xác thực email
  emailVerificationExpires: { type: Date }, // Thời gian hết hạn mã xác thực email

  // Đặt lại mật khẩu
  passwordResetToken: { type: String }, // Mã đặt lại mật khẩu
  passwordResetExpires: { type: Date }, // Thời gian hết hạn mã đặt lại mật khẩu
});

const User = mongoose.model("User", userSchema);

module.exports = User;
