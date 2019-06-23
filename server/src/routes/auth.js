const auth = require("../controllers/userController.js");
const router = require("koa-router")();

router.get("/user/:id", auth.getUserInfo);
router.post("/login", auth.vertifyUserLogin);

module.exports = router;
