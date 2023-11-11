const user = require("./User");
const passwordrecord = require("./PasswordRecord");
const warehouse = require("./Warehouse");
// const message = require("./Message");
const feedback = require("./Feedback");
function route(app) {
  app.use("/user", user);
  app.use("/warehouse", warehouse);
  app.use("/passwordrecord", passwordrecord);
  // app.use("/message", message);
  //app.use("/feedback", feedback);
  //app.use("/accesscountdetail", accesscountdetail);
}

module.exports = route;
