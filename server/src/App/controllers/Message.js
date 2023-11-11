const bcrypt = require('bcrypt');
const Message = require('../models/Message');

class Message {
  async addMessage(req, res) {
    console.log('oke ');
    const { user_id, title, text, password, urlSend, createDate, startDate, endDate, accessCount, note } = req.body;

    try {
      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new message record
      const newMessage = new Message({
        user_id,
        title,
        text,
        password: hashedPassword,
        urlSend,
        createDate,
        startDate,
        endDate,
        accessCount,
        note,
      });

      // Save the new message record to the database
      await newMessage.save();

      // Return a successful response
      res.status(201).json({
        status: 'Success',
        data: {
          newMessage,
        },
      });
    } catch (error) {
      // Return an error response
      res.status(500).json({
        status: 'Failed',
        message: error.message,
      });
    }
  }

  async updateMessage(req, res) {
    console.log('Join to updateMessage');
    const { _id, user_id, title, text, password, urlSend, createDate, startDate, endDate, accessCount, note } = req.body;

    try {
      // Find the existing message record based on _id
      const existingMessage = await Message.findByIdAndUpdate(
        _id,
        {
          user_id: user_id,
          title: title,
          text: text,
          password: password,
          urlSend: urlSend,
          createDate: createDate,
          startDate: startDate,
          endDate: endDate,
          accessCount: accessCount,
          note: note,
        },
        { new: true }
      );

      // Return a successful response with the updated message record
      res.status(200).json({
        status: 'Success',
        data: {
          existingMessage,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'Failed',
        message: 'Internal server error',
      });
    }
  }

  async deleteMessage(req, res) {
    console.log('Join to deleteMessage');
    try {
      // Find and delete the existing message record based on _id
      const result = await Message.findOneAndDelete({ _id: req.params.id });

      if (!result) {
        // If the message record is not found
        res.status(404).json({
          status: 'Failed',
          message: 'Message record not found',
        });
      } else {
        // Message record successfully deleted
        res.status(204).json({
          status: 'Success',
          data: {},
        });
      }
    } catch (error) {
      // Handle error if there's an error during the findOneAndDelete() operation
      res.status(500).json({
        status: 'Failed',
        message: error.message,
      });
    }
  }

  async showAllMessage(req, res) {
    console.log('oke ');
    try {
      // Retrieve all message records
      const messages = await Message.find();

      // Return a successful response with the message records
      res.status(200).json({
        status: 'Success',
        data: {
          messages,
        },
      });
    } catch (error) {
      // Return an error response
      res.status(500).json({
        status: 'Failed',
        message: error.message,
      });
    }
  }

  async showMessageById(req, res) {
    console.log('oke showMessageById');
    try {
      // Find the message record based on _id
      const message = await Message.findById(req.params.id);

      if (!message) {
        // If the message record is not found
        res.status(404).json({
          status: 'Failed',
          message: 'Message record not found',
        });
      } else {
        // Return a successful response with the message record
        res.status(200).json({
          status: 'Success',
          data: {
            message,
          },
        });
      }
    } catch (error) {
      // Return an error response
      res.status(500).json({
        status: 'Failed',
        message: error.message,
      });
    }
  }

  async changeMessagePassword(req, res) {
    console.log('oke changeMessagePassword');
    const { messageId, currentPassword, newPassword } = req.body;

    try {
      // Find the message record based on messageId
      const message = await Message.findById(messageId);

      if (!message) {
        // If the message record is not found
        res.status(404).json({
          status: 'Failed',
          message: 'Message record not found',
        });
      } else {
        // Compare the current password with the stored hashed password
        const passwordMatch = await bcrypt.compare(currentPassword, message.password);

        if (!passwordMatch) {
          // If the current password doesn't match the stored password
          res.status(400).json({
            status: 'Failed',
            message: 'Current password is incorrect',
          });
        } else {
          // Hash the new password
          const hashedNewPassword = await bcrypt.hash(newPassword, 10);

          // Update the password of the message record
          message.password = hashedNewPassword;
          await message.save();

          // Return a successful response
          res.status(200).json({
            status: 'Success',
            message: 'Password successfully changed',
          });
        }
      }
    } catch (error) {
      // Return an error response
      res.status(500).json({
        status: 'Failed',
        message: error.message,
      });
    }
  }

  async notifyOnMessageAccess(req, res) {
    console.log('oke notifyOnMessageAccess');
    const { messageId } = req.body;

    try {
      // Find the message record based on messageId
      const message = await Message.findById(messageId);

      if (!message) {
        // If the message record is not found
        res.status(404).json({
          status: 'Failed',
          message: 'Message record not found',
        });
      } else {
        // Send notification to the email address
        const transporter = nodemailer.createTransport({
          // Configure the transporter for sending emails (e.g., Gmail SMTP)
          // ...
        });

        const mailOptions = {
          from: 'your-email@example.com',
          to: 'thanhgiangdz@gmail.com',
          subject: 'Notification: Your message has been accessed',
          text: 'Your message has been accessed by someone.',
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            res.status(500).json({
              status: 'Failed',
              message: 'Error sending notification email',
            });
          } else {
            // Return a successful response
            res.status(200).json({
              status: 'Success',
              message: 'Notification email sent',
            });
          }
        });
      }
    } catch (error) {
      // Return an error response
      res.status(500).json({
        status: 'Failed',
        message: error.message,
      });
    }
  }

  async overviewStatistics(req, res) {
    console.log('oke overviewStatistics');
    try {
      // Count the total number of message records
      const totalMessages = await Message.countDocuments();

      // Aggregate the total access count for all message records
      const totalAccessCount = await Message.aggregate([
        {
          $group: {
            _id: null,
            totalAccessCount: { $sum: '$accessCount' },
          },
        },
      ]);

      // Find the top 5 messages with the highest access count
      const topMessages = await Message.find().sort({ accessCount: -1 }).limit(5);

      // Return a successful response with the overview statistics
      res.status(200).json({
        status: 'Success',
        data: {
          totalMessages,
          totalAccessCount: totalAccessCount.length > 0 ? totalAccessCount[0].totalAccessCount : 0,
          topMessages,
        },
      });
    } catch (error) {
      // Return an error response
      res.status(500).json({
        status: 'Failed',
        message: error.message,
      });
    }
  }
}

module.exports = new Message();