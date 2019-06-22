const auth = require("../controllers/userController.js");
const router = require("koa-router")();

router.get("/user/:id", auth.getUserInfo);

module.exports = router;
