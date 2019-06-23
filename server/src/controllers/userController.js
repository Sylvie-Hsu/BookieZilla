const user = require("../models/userModel.js");
const jwt = require("koa-jwt");

const getUserInfo = async function(ctx) {
  const id = ctx.params.id;
  const result = await user.getUserById(id);
  ctx.body = result;
};

const vertifyUserLogin = async function(ctx) {
  const data = ctx.request.body;
  const userInfo = await user.getUserByEmail(data.email);

  if (userInfo != null) {
    if (userInfo.UserPsw != data.psw) {
      ctx.body = {
        status: false,
        msg: "Wrong password"
      };
    } else {
      const userToken = {
        id: userInfo.UserID,
        email: userInfo.UserEmail
      };
      const secret = "react-koa-bookiezilla";
      const token = jwt.sign(userToken, secret);
      ctx.body = {
        status: true,
        token: token
      };
    }
  } else {
    ctx.body = {
      status: false,
      msg: "User doesn't exist"
    };
  }
};

module.exports = {
  getUserInfo,
  vertifyUserLogin
};
