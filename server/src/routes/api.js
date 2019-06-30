const api = require("../controllers/apiController.js");
const router = require("koa-router")();

router.get("/getbooks", api.getAllBooks);
router.get("/getorder/:id", api.getOrderInfo);
router.post("/publish", api.publishNewBook);
router.post("/confirmorder", api.updateOrderOfTrade);

module.exports = router;
