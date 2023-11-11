var express = require("express");
const router = express.Router();

const passwordrecord = require("../App/controllers/PasswordRecord.js");
router.post("/add-passwordrecord", passwordrecord.addPasswordRecord);
router.patch("/update-passwordrecord", passwordrecord.updatePasswordRecord);
router.delete(
  "/delete-passwordrecord/:id",
  passwordrecord.deletePasswordRecord
);
// router.get(
//   "/showAllDataWithUserId-passwordrecord",
//   passwordrecord.showAllDataWithUserId
// );
// router.get('/show-all-passrecord', passwordrecord.showAllData);
// router.get('/get-password-record-by-id/:id', passwordrecord.getPasswordRecordById);
// router.post('/pass-strength-analysis', passwordrecord.passwordStrengthAnalysis);
// router.get('/overview-statistics', passwordrecord.overviewStatistics);
module.exports = router;
