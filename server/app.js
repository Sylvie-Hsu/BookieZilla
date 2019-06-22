const Koa = require("koa");
const json = require("koa-json");
const logger = require("koa-logger");
const KoaRouter = require("koa-router");
const parser = require("koa-bodyparser");
const auth = require("./src/routes/auth.js");

const app = new Koa();
const router = new KoaRouter();

// Json Prettier Middleware
app.use(json());
app.use(parser());
app.use(logger());

// Simple Middleware Example
// app.use(async ctx => (ctx.body = { msg: "Hello world" }));

// Router Middleware
router.use("/auth", auth.routes());

app.use(router.routes()).use(router.allowedMethods());

app.listen(4113, () => console.log("----------Server Started----------"));

module.exports = app;
