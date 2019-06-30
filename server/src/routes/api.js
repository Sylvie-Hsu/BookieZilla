const api = require("../controllers/apiController.js");
const router = require("koa-router")();

router.post("/publish", api.publishNewBook);

module.exports = router;
