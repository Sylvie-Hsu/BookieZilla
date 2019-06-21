const Koa = require("koa");
const json = require("koa-json");
const router = require("koa-router");
const logger = require("koa-logger");
const parser = require("koa-bodyparser");

const app = new Koa();

app.use(json());
app.use(parser());
app.use(logger());

app.use(async ctx => (ctx.body = { msg: "Hello World" }));

app.listen(3000, () => console.log("Server Started..."));
