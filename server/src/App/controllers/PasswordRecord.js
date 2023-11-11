const PasswordRecordModel = require("../models/PasswordRecord");

class PasswordRecord {
  async addPasswordRecord(req, res) {
    console.log("oke ");
    const { user_id, title, username, password, url, note } = req.body;

    try {
      // Tạo một đối tượng bản ghi mật khẩu mới
      const newPasswordRecord = new PasswordRecordModel({
        user_id,
        title,
        username,
        password,
        url,
        note,
      });

      // Lưu đối tượng bản ghi mật khẩu mới vào cơ sở dữ liệu
      await newPasswordRecord.save();

      // Trả về phản hồi thành công
      res.status(201).json({
        check: "Success",
        data: {
          newPasswordRecord,
        },
      });
    } catch (error) {
      // Trả về phản hồi lỗi
      res.status(500).json({
        check: "false",
        message: error.message,
      });
    }
  }

  async updatePasswordRecord(req, res) {
    console.log("Join to updatePasswordRecord");
    const { _id, user_id, title, username, password, url, note } = req.body;

    try {
      // Tìm kiếm bản ghi mật khẩu hiện có dựa trên _id
      const existingPasswordRecord =
        await PasswordRecordModel.findByIdAndUpdate(
          _id,
          {
            user_id: user_id,
            title: title,
            username: username,
            password: password,
            url: url,
            note: note,
          },
          { new: true }
        );

      // Trả về phản hồi thành công với thông tin về bản ghi mật khẩu đã cập nhật
      res.status(200).json({
        status: "Success",
        data: {
          existingPasswordRecord,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "Failed",
        message: "Internal server error",
      });
    }
  }

  async deletePasswordRecord(req, res) {
    console.log("Join to deletePasswordRecord");
    try {
      // Tìm kiếm bản ghi mật khẩu hiện có dựa trên _id
      const result = await PasswordRecordModel.findOneAndDelete({
        _id: req.params.id,
      });

      if (!result) {
        // Không tìm thấy bản ghi mật khẩu
        res.status(404).json({
          status: "Failed",
          message: "Password record not found",
        });
      } else {
        // Bản ghi mật khẩu đã được xóa thành công
        res.status(204).json({
          status: "Success",
          data: {},
        });
      }
    } catch (error) {
      // Xử lý lỗi nếu có lỗi trong quá trình thực hiện findOneAndDelete()
      res.status(500).json({
        status: "Failed",
        message: error.message,
      });
    }
  }

  async showAllData(req, res) {
    console.log('oke ');
    try {
      const passwordRecords = await PasswordRecordModel.find({}, '_id user_id title username password url note');

      if (passwordRecords.length === 0) {
        return res.status(200).json({
          message: 'No data found in the database.',
        });
      }

      const dataList = passwordRecords.map(record => ({
        _id: record._id,
        user_id: record.user_id,
        title: record.title,
        username: record.username,
        password: record.password,
        url: record.url,
        note: record.note,
      }));

      return res.status(200).json({
        data: dataList,
      });
    } catch (error) {
      console.error('Error querying data:', error);
      return res.status(500).json({
        message: 'Error querying data',
      });
    }
  }

  async getPasswordRecordById(req, res) {
    console.log('oke ');
    try {
      const passwordRecord = await PasswordRecordModel.findById(req.params.id);

      if (!passwordRecord) {
        return res.status(404).json({
          status: 'Failed',
          message: 'Password record not found',
        });
      }

      return res.status(200).json({
        status: 'Success',
        data: passwordRecord,
      });
    } catch (error) {
      console.error('Error querying data:', error);
      return res.status(500).json({
        message: 'Error querying data',
      });
    }
  }

  async passwordStrengthAnalysis(req, res) {
    console.log('oke ');
    const { password } = req.body;

    // Perform password strength analysis logic here
    // ...

    // Return the analysis result
    return res.status(200).json({
      status: 'Success',
      data: {
        strength: 'Strong', // Replace with actual analysis result
      },
    });
  }

  async overviewStatistics(req, res) {
    console.log('oke ');
    try {
      const totalRecords = await PasswordRecordModel.countDocuments();
      const strongPasswordCount = await PasswordRecordModel.countDocuments({ strength: 'Strong' });
      const weakPasswordCount = await PasswordRecordModel.countDocuments({ strength: 'Weak' });
  
      return res.status(200).json({
        status: 'Success',
        data: {
          totalRecords,
          strongPasswordCount,
          weakPasswordCount,
        },
      });
    } catch (error) {
      console.error('Error querying data:', error);
      return res.status(500).json({
        message: 'Error querying data',
      });
    }
  }
}

module.exports = new PasswordRecord();
