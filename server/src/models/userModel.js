const db = require("../config/database.js");
const userModel = "../schema/user.js";
const BookieZilla = db.BookieZilla;

const User = BookieZilla.import(userModel);

const getUserById = function*(id) {
  const userInfo = yield User.findOne({
    where: {
      UserID: id
    }
  });
  return userInfo;
};

module.exports = {
  getUserById
};
