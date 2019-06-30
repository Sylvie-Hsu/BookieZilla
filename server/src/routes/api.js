const api = require("../controllers/apiController.js");
const router = require("koa-router")();

router.get("/getbooks", api.getAllBooks);
router.post("/publish", api.publishNewBook);

module.exports = router;
