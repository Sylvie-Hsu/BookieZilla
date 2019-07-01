const msg = require("../controllers/msgController.js");
const router = require("koa-router")();

router.get("/getcomments", msg.getAllComments);
router.post("/newcomment", msg.publishNewComment);

module.exports = router;
