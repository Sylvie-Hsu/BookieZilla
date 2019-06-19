const Koa = require("koa");
const json = require("koa-json");

const app = new Koa();

app.use(json());

app.use(async ctx => (ctx.body = { msg: "Hello World" }));

app.listen(3000, () => console.log("Server Started..."));
