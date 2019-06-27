const auth = require("../controllers/userController.js");
const router = require("koa-router")();

router.get("/user/:id", auth.getUserInfo);
router.post("/login", auth.vertifyUserLogin);
router.post("/signup", auth.signupNewUser);

module.exports = router;
