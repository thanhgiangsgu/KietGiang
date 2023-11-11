const Feedback = require("../models/feedbackModel");
const UserModel = require("../models/User"); // Import model của người dùng

const nodemailer = require("nodemailer");

// Hàm kiểm tra tồn tại của địa chỉ email
const isEmailRegistered = async (email) => {
  const user = await UserModel.findOne({ email: email });
  return user !== null;
};

// Hàm xử lý phản hồi
const handleFeedback = async (req, res) => {
  const { email, phoneNumber, feedback } = req.body;

  // Kiểm tra xem địa chỉ email đã đăng kí trong hệ thống chưa
  if (!(await isEmailRegistered(email))) {
    return res.status(400).json({ message: "Email chưa được đăng ký" });
  }

  try {
    // Lưu phản hồi vào cơ sở dữ liệu
    const newFeedback = new Feedback({
      email,
      phoneNumber,
      feedback,
    });
    await newFeedback.save();

    // Cấu hình máy chủ SMTP của Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "leduykhanhqn123@gmail.com", // Thay bằng địa chỉ email của bạn
        pass: "cblk cbkt tkah oywv", // Thay bằng mật khẩu của bạn
      },
    });

    const mailOptions = {
      from: "leduykhanhqn123@gmail.com",
      to: "khanhdz3612@gmail.com",
      subject: "New Feedback Received",
      text: `Email: ${email}\nPhone Number: ${phoneNumber}\nFeedback: ${feedback}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending email to admin" });
      } else {
        console.log("Email sent: " + info.response);
        res
          .status(201)
          .json({ message: "Feedback received and email sent to admin" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { handleFeedback };
