# BookieZilla开发手记

## 项目功能

最近在做一个旧书交易网站，本属于B/S体系结构的课程作业，但由于采用了新的框架所以跃跃欲试想都记录下来。

> 实现一个旧书交易网站，基本功能如下：
>
> 1. 实现用户注册、登录功能，用户注册时需要填写必要的信息并验证，如用户名、密码要求在6字节以上，email的格式验证，并保证用户名和email在系统中唯一。
> 2.  用户登录后可以发布要交易的书籍，需要编辑相关信息，包括书名、原价、出售价、类别和内容介绍等信息、外观照片等，可以通过ISBN和书名链接到外部系统（如Amazon/京东/当当等网站）的详细介绍页面。
> 3. 根据用户发布的书籍聚合生成首页，可以分类检索。
> 4. 用户可以设置交易模式为寄送还是线下交易，生成订单时录入不同内容。
> 5.  集成一个消息系统，买家和卖家之间可以通信。
> 6. 提供求购模块，用户可以发布自己想要的书籍。
> 7. 界面样式需要适配PC和手机的浏览器。
> 8.  实现一个Android或iphone客户端软件，功能同网站，额外支持定位功能，发布时记录位置，可以根据用户的位置匹配最近的待售书籍。消息和订单支持推送。

## 技术选型

### 数据库

![1561976460380](assets/1561976460380.png)

数据库使用MySQL进行开发，因为环境之前都已经配好了(￣▽￣)"

### 后端

![Image result for koa.js](assets/1_KV5Uyy1RYBh4TKvivBUAgQ.jpeg)

经过Express和Koa比对，最终选择Koa作为基于Node.js的Web开发框架。Koa是一个新的web框架，由Express幕后原班人马打造，语法上也使用了ES6新的语法（例如丢弃了回调函数而使用async解决异步调用问题），看起来十分优雅o(*￣▽￣*)o

### 前端

![1561976126427](assets/1561976126427.png)

采用React+Semantic UI，由于之前对React有足够多的实践，因此本次重点还是放在后端开发及前后端连接上……

## 开发过程

### 参考教程

[Vue+Koa全栈开发](https://molunerfinn.com/Vue+Koa/#%E5%86%99%E5%9C%A8%E5%89%8D%E9%9D%A2)

[Koa框架教程 - 阮一峰](http://www.ruanyifeng.com/blog/2017/08/koa.html)

### Koa框架搭建

#### 初始化

1. 命令行输入

   ```
   npm init -y
   npm i koa koa-json
   npm i -D nodemon
   ```

2. 更改`package.json`内容，将`scripts`中的内容更改为`"start":"nodemon app.js"`

   ![1560958230615](assets/1560958230615.png)

3. 根目录下新建`app.js`

   ```js
   const Koa = require("koa");
   const json = require("koa-json");
   const logger = require("koa-logger");
   const KoaRouter = require("koa-router");
   const parser = require("koa-bodyparser");
   
   const app = new Koa();
   const router = new KoaRouter();
   
   // Json Prettier Middleware
   app.use(json());
   app.use(parser());
   app.use(logger());
   
   // Simple Middleware Example
   // app.use(async ctx => (ctx.body = { msg: "Hello world" }));
   
   app.listen(4113, () => console.log("----------Server Started----------"));
   
   module.exports = app;
   ```

4. 命令行输入`node app.js`，浏览器打开`localhost:3000`查看返回数据

   ![1560958508499](assets/1560958508499.png)

#### sequelize连接数据库

1. 安装包

   ```
   npm install sequelize-auto -g
   npm install tedious -g
   npm install mysql -g
   ```

2. 进入`src`目录，输入`sequelize-auto -o "./schema" -d bookiezilla -h 127.0.0.1 -u root -p 3306 -x XXXXX -e mysql`，（其中 -o 参数后面的是输出的文件夹目录， -d 参数后面的是数据库名， -h 参数后面是数据库地址， -u 参数后面是数据库用户名， -p 参数后面是端口号， -x 参数后面是数据库密码  -e 参数后面指定数据库为mysql）

   此时`schema`文件夹下会自动生成三个表的文件，例如：

   ```js
   /* jshint indent: 2 */
   
   module.exports = function(sequelize, DataTypes) {
     return sequelize.define(
       "book",
       {
         BookID: {
           type: DataTypes.INTEGER(11),
           allowNull: false,
           primaryKey: true
         },
         BookName: {
           type: DataTypes.STRING(45),
           allowNull: true
         },
         BookCostPrice: {
           type: "DOUBLE",
           allowNull: true
         },
         BookSalePrice: {
           type: "DOUBLE",
           allowNull: true
         },
         BookCategory: {
           type: DataTypes.STRING(45),
           allowNull: true
         },
         BookPhoto: {
           type: DataTypes.STRING(45),
           allowNull: true
         },
         BookContent: {
           type: DataTypes.STRING(45),
           allowNull: true
         },
         BookISBN: {
           type: DataTypes.STRING(45),
           allowNull: true
         }
       },
       {
         tableName: "book"
       }
     );
   };
   ```

3. 在`server\src\config`下新建文件`database.js`，用于初始化`Sequelize`和数据库的连接。

   ```js
   const Sequelize = require("sequelize");
   
   // 使用url连接的形式进行连接，注意将root: 后面的XXXX改成自己数据库的密码
   const BookieZilla = new Sequelize(
     "mysql://root:XXXXX@localhost/bookiezilla",
     {
       define: {
         timestamps: false// 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt），否则进行增删改查操作时可能会报错
       }
     }
   );
   
   module.exports = {
     BookieZilla // 将BookieZilla暴露出接口方便Model调用
   };
   ```

4. 为方便之后根据用户id查询信息，可先在数据库中随意增加一条数据。

   ![1561275142511](assets/1561275142511.png)

5. 在`server\src\models`下新建文件`userModel.js`，数据库和表结构文件连接起来。

   ```js
   const db = require("../config/database.js");
   const userModel = "../schema/user.js";// 引入user的表结构
   const BookieZilla = db.BookieZilla;// 引入数据库
   
   const User = BookieZilla.import(userModel);// 用sequelize的import方法引入表结构，实例化了User。
   
   const getUserById = async function(id) {
     const userInfo = await User.findOne({
       where: {
         UserID: id
       }
     });
     return userInfo;
   };
   
   module.exports = {
     getUserById,
     getUserByEmail
   };
   ```

6. 在`server\src\controllers`下新建文件`userController.js`，来执行这个方法，并返回结果。

   > Koa 提供一个 Context 对象，表示一次对话的上下文（包括 HTTP 请求和 HTTP 回复）。通过加工这个对象，就可以控制返回给用户的内容。

   ```js
   const user = require("../models/userModel.js");
   
   const getUserInfo = async function(ctx) {
     const id = ctx.params.id;// 获取url里传过来的参数里的id
     const result = await user.getUserById(id);
     ctx.body = result;// 将请求的结果放到response的body里返回
   };
   
   module.exports = {
     getUserInfo,
     vertifyUserLogin
   };
   
   ```

7. 在`server\src\routes`下新建文件`auth.js`，用于规划`auth`下的路由规则。

   ```js
   const auth = require("../controllers/userController.js");
   const router = require("koa-router")();
   
   router.get("/user/:id", auth.getUserInfo);
   
   module.exports = router;
   ```

8. 回到根目录下的`app.js`，将这个路由规则“挂载”到Koa上去。

   ```js
   const Koa = require("koa");
   const json = require("koa-json");
   const logger = require("koa-logger");
   const KoaRouter = require("koa-router");
   const parser = require("koa-bodyparser");
   const auth = require("./src/routes/auth.js");// 引入auth
   
   const app = new Koa();
   const router = new KoaRouter();
   
   // Json Prettier Middleware
   app.use(json());
   app.use(parser());
   app.use(logger());
   
   // Simple Middleware Example
   // app.use(async ctx => (ctx.body = { msg: "Hello world" }));
   
   // Router Middleware
   router.use("/auth", auth.routes());// 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
   
   app.use(router.routes()).use(router.allowedMethods());// 将路由规则挂载到Koa上。
   
   app.listen(4113, () => console.log("----------Server Started----------"));
   
   module.exports = app;
   ```

9. API Test

   ![1561275745455](assets/1561275745455.png)

   SUCCESS!!!

### 前后端数据传递

由于本项目采用的是前后端分离的架构，因此需要通过json来传递数据，以实现登录功能为例来阐述实现的具体步骤。

#### 后端验证登录

1. `server\src\models\userModel.js`增加方法，用于通过邮箱查找用户。

   ```js
   // ...
   const getUserByEmail = async function(email) {
     const userInfo = await User.findOne({
       where: {
         UserEmail: email
       }
     });
     return userInfo;
   };
   
   module.exports = {
     getUserById,
     getUserByEmail
   };
   ```

2. `server\src\controller\userController.js`增加方法，用于验证登录信息并将结果以`json`形式返回给前端。

   注意此处实际上应用了JSON-WEB-TOKEN实现无状态请求，关于`jwt`的原理和实现方法请参考[这篇文章](http://blog.leapoahead.com/2015/09/07/user-authentication-with-jwt/?utm_source=tuicool&utm_medium=referral)和[这篇文章](https://segmentfault.com/a/1190000005783306)。
   
   简单来说，运用了JSON-WEB-TOKEN的登录系统应该是这样的：
   
   - 用户在登录页输入账号密码，将账号密码（密码进行md5加密）发送请求给后端
   - 后端验证一下用户的账号和密码的信息，如果符合，就下发一个TOKEN返回给客户端。如果不符合就不发送TOKEN回去，返回验证错误信息。
   - 如果登录成功，客户端将TOKEN用某种方式存下来（SessionStorage、LocalStorage）,之后要请求其他资源的时候，在请求头（Header）里带上这个TOKEN进行请求。
   - 后端收到请求信息，先验证一下TOKEN是否有效，有效则下发请求的资源，无效则返回验证错误。
   
   使用前需要安装相应库：
   
   ```
   npm i koa-jwt jsonwebtoken util -s
   ```

   此外，为保证安全性，后端数据库的密码不能采用明文保存，此处使用`bcrypt`的加密方式。
   
   ```
   npm i bcryptjs -s
   ```

   ```js
   const user = require("../models/userModel.js");
   const jwt = require("jsonwebtoken");
   const bcrypt = require("bcryptjs");
   
   const getUserInfo = async function(ctx) {
     const id = ctx.params.id;
     const result = await user.getUserById(id);
     ctx.body = result;
   };
   
   const vertifyUserLogin = async function(ctx) {
     const data = ctx.request.body; // post过来的数据存在request.body里
     const userInfo = await user.getUserByEmail(data.email);
   
     if (userInfo != null) { // 如果查无此用户会返回null
       if (!bcrypt.compareSync(data.psw, userInfo.UserPsw) {
         ctx.body = {
           status: false,
           msg: "Wrong password"
         };
       } else { // 如果密码正确
         const userToken = {
           id: userInfo.UserID,
           email: userInfo.UserEmail
         };
         const secret = "react-koa-bookiezilla"; // 指定密钥，这是之后用来判断token合法性的标志
         const token = jwt.sign(userToken, secret); // 签发token
         ctx.body = {
           status: true,
           token: token // 返回token
         };
       }
     } else {
       ctx.body = {
         status: false,
         msg: "User doesn't exist"
       };
     }
   };
   
   module.exports = {
     getUserInfo,
     vertifyUserLogin
   };
   
   ```

3. 更新`server\src\routes\auth.js`中的路由规则。

   ```js
   const auth = require("../controllers/userController.js");
   const router = require("koa-router")();
   
   router.get("/user/:id", auth.getUserInfo);
   router.post("/login", auth.vertifyUserLogin);
   
   module.exports = router;
   ```

#### 前端校验数据并发送请求

前端主要使用了`react-router`进行路由跳转，使用`semantic-ui`作为UI组件库，使用`axios`发送请求，`Login.js`代码如下：

```js
import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Loader
} from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";
import Logo from "../images/logo.png";

class Login extends Component {
  state = {
    email: "",
    psw: "",
    alert: false,
    load: false
  };

  vertifyFormat = () => {
    var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return pattern.test(this.state.email) && this.state.psw.length >= 6;
  };

  sendLoginRequest = () => {
    if (this.vertifyFormat()) {
      this.setState({
        alert: false,
        load: true
      });
      axios
        .post("/auth/login", {
          email: this.state.email,
          psw: this.state.psw
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({
        alert: true
      });
    }
  };

  render() {
    var alert =
      this.state.alert === false ? (
        <div />
      ) : (
        <Message
          error
          header="Could you check something!"
          list={[
            "Email format must conform to the specification.",
            "Password must be at least six characters."
          ]}
        />
      );
    var load = this.state.load === false ? <div /> : <Loader />;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh", background: "#f6f6e9" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src={Logo} />
            Log-in to your B::kzilla
          </Header>
          <Form size="large" error active>
            <Segment>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={event => {
                  this.setState({
                    email: event.target.value
                  });
                }}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={event => {
                  this.setState({
                    psw: event.target.value
                  });
                }}
              />
              {alert}
              {load}
              <Button
                color="teal"
                fluid
                size="large"
                onClick={this.sendLoginRequest}
              >
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us?
            <NavLink to="/signup">
              <a href="#"> Sign Up</a>
            </NavLink>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(Login);
```

#### React配置代理

1. 安装`http-proxy-middleware`中间件。

   ```
   npm install http-proxy-middleware -s
   ```

2. `create-react-app`初始化的项目需要`eject`，使基本配置暴露出来。

   ```
   npm run eject
   ```

3. `client\src`下新建文件`setupProxy.js`，配置代理转发信息。

   ```js
   const proxy = require("http-proxy-middleware");
   
   module.exports = function(app) {
     app.use(
       proxy("/api", {
         target: "http://localhost:4113",
         changeOrigin: true
       })
     );
     app.use(
       proxy("/auth", {
         target: "http://localhost:4113",
         changeOrigin: true
       })
     );
   };
   ```

4. `client\scripts\start.js`中进行配置，在`const devServer = new WebpackDevServer(compiler, serverConfig);`后添加语句`require("../src/setupProxy")(devServer);`

   ![1561279219148](assets/1561279219148.png)

5. 发送请求格式如下：

   ```js
   axios
     .post("/auth/login", {
       email: this.state.email,
       psw: this.state.psw
     })
     .then(res => {
       console.log(res);
     })
     .catch(err => {
       console.log(err);
     });
   ```

6. 喜闻乐见的测试环节！

   ![1561279449368](assets/1561279449368.png)

   ![1561289529393](assets/1561289529393.png)

## 设计原理

### 数据库

#### User

| *UserID | UserName    | UserPsw     | *UserEmail  |
| ------- | ----------- | ----------- | ----------- |
| INT     | VARCHAR(45) | VARCHAR(45) | VARCHAR(45) |

```mysql
CREATE TABLE `bookiezilla`.`user` (
  `UserID` INT NOT NULL,
  `UserName` VARCHAR(45) NULL,
  `UserPsw` VARCHAR(45) NULL,
  `UserEmail` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`UserID`, `UserEmail`));
```

#### Book

| *BookID | BookName    | BookCostPrice | BookSalePrice | BookCategory | BookPhoto   | BookContent | BookISBN    | BookRefs    |
| ------- | ----------- | ------------- | ------------- | ------------ | ----------- | ----------- | ----------- | ----------- |
| INT     | VARCHAR(45) | DOUBLE        | DOUBLE        | VARCHAR(45)  | VARCHAR(45) | VARCHAR(45) | VARCHAR(45) | VARCHAR(45) |

```mysql
CREATE TABLE `bookiezilla`.`book` (
  `BookID` INT NOT NULL,
  `BookName` VARCHAR(45) NULL,
  `BookCostPrice` DOUBLE NULL,
  `BookSalePrice` DOUBLE NULL,
  `BookCategory` VARCHAR(45) NULL,
  `BookPhoto` VARCHAR(45) NULL,
  `BookContent` VARCHAR(45) NULL,
  `BookISBN` VARCHAR(45) NULL,
  PRIMARY KEY (`BookID`));
```

#### Order

| *OrderID | *UserID | *BookID | TradeMethod | TradeStatus | TradeParty  | TraderID |
| -------- | ------- | ------- | ----------- | ----------- | ----------- | -------- |
| INT      | INT     | INT     | VARCHAR(45) | VARCHAR(45) | VARCHAR(45) | INT      |

```mysql
CREATE TABLE `bookiezilla`.`order` (
  `OrderID` INT NOT NULL,
  `UserID` INT NOT NULL,
  `BookID` INT NOT NULL,
  `TradeMethod` VARCHAR(45) NULL,
  `TradeStatus` VARCHAR(45) NULL,
  `TraderID` INT NULL,
  PRIMARY KEY (`OrderID`));
```

### 前端

#### 目录结构

```js
.
│  .gitignore
│  package-lock.json
│  package.json
│  README.md
│  yarn.lock
│
├─config // 基本配置文件
│  │  env.js
│  │  modules.js
│  │  paths.js
│  │  pnpTs.js
│  │  webpack.config.js
│  │  webpackDevServer.config.js
│  │
│  └─jest
│          cssTransform.js
│          fileTransform.js
│
├─public
│      favicon.ico
│      index.html
│      manifest.json
│
├─scripts // eject后生成的文件配置
│      build.js
│      start.js
│      test.js
│
└─src // 主要页面及组件部分
    │  App.css
    │  App.js
    │  index.css
    │  index.js
    │  serviceWorker.js
    │  setupProxy.js // 设置代理转发，解决跨域问题
    │
    ├─actions // react-redux需要定义的actions
    │      UpdateActions.js
    │
    ├─components // 页面的组件部分
    │      BookList.jsx
    │      BookMarket.jsx
    │      FeedBack.jsx
    │      OrderInfo.jsx
    │      PublishForm.jsx
    │      SearchBar.jsx
    │      SideMenu.jsx
    │      StatisticData.jsx
    │      StepFlow.jsx
    │
    ├─images // 项目中使用的图片资源
    │      logo.png
    │      matthew.png
    │
    ├─pages // 页面部分
    │      Home.jsx
    │      Login.jsx
    │      Market.jsx
    │      Message.jsx
    │      Publish.jsx
    │      Signup.jsx
    │
    └─reducers // react-redux需要定义的reducers
            rootReducer.js    
```

#### 实现细节

##### React-router

项目中使用了`react-router`来控制路由，基本原理如下：

1. 在`App.js`中引入路由对应的页面或组件，并引入`react-router-dom`中的`BrowserRouter`、`Route`、`Switch`组件进行定义。

   ```js
   // App.jsx
   
   import React, { Component } from "react";
   import { BrowserRouter, Route, Switch } from "react-router-dom";
   
   import SideMenu from "./components/SideMenu";
   import Login from "./pages/Login";
   import Signup from "./pages/Signup";
   import Home from "./pages/Home";
   import Market from "./pages/Market";
   import Publish from "./pages/Publish";
   import Message from "./pages/Message";
   import OrderInfo from "./components/OrderInfo";
   
   class App extends Component {
     render() {
       return (
         <BrowserRouter>
           <div className="App">
             <Switch>
               <Route exact path="/" component={Login} />
               <Route path="/signup" component={Signup} />
               <div>
                 <div>
                   <SideMenu />
                 </div>
                 <div style={{ margin: "10px 10px 10px 160px" }}>
                   {/* Only match one */}
                   <Route path="/home" component={Home} />
                   <Route path="/market" component={Market} />
                   <Route path="/publish" component={Publish} />
                   <Route path="/message" component={Message} />
                   <Route path="/books/:book_id" component={OrderInfo} />
                 </div>
               </div>
             </Switch>
           </div>
         </BrowserRouter>
       );
     }
   }
   
   export default App;
   
   ```

2. 当项目页面中需要进行页面跳转时，可使用`react-router-dom`中的`withRouter`将组件包裹起来，再使用`NavLink`进行跳转。

   ```js
   // Login.jsx
   
   import { NavLink, withRouter } from "react-router-dom";
   
   class Login extends Component {
     .....
     sendLoginRequest = () => {
       ......
       this.props.history.push("/home");
       render(){
          ......
       }
     };
   
   export default withRouter(Login);
   
   ```

##### React-redux

![Redux](assets/Redux.png)

![Redussx](assets/Redussx-1561982861739.png)

本项目中采用了`react-redux`进行状态管理，redux的主要作用是允许状态在不同分支的组件中进行传递，从而避免了使用原始方法（如`this.props`）导致的不同分支组件之间数据无法传递、子组件无法修改父组件状态等问题。具体使用方法如下：

1. 在`src\reducers`下新建文件`rootReducer.js`用于更新中心状态树中的信息。

   ```js
   // rootReducer.js
   
   const initState = {
     id: null,
     token: null
   };
   
   const rootReducer = (state = initState, action) => {
     if (action.type === "UPDATE_ID") {
       return {
         ...state,
         id: action.id
       };
     }
     if (action.type === "UPDATE_TOKEN") {
       return {
         ...state,
         token: action.token
       };
     }
     return state;
   };
   
   export default rootReducer;
   ```

2. 在`src\actions`中新建文件`UpdateActions.js`用于定义行为。

   ```js
   // UpdateActions.js
   
   export const updateId = id => {
     return {
       type: "UPDATE_ID",
       id: id
     };
   };
   
   export const updateToken = token => {
     return {
       type: "UPDATE_TOKEN",
       token: token
     };
   };
   ```

3. 在`src\index.js`中使用`react-redux`中的组件对项目入口文件进行包裹，并在全局范围内建立状态树。

   ```js
   // index.js
   
   import React from "react";
   import ReactDOM from "react-dom";
   import "./index.css";
   import App from "./App";
   import * as serviceWorker from "./serviceWorker";
   import "semantic-ui-css/semantic.min.css";
   import { createStore } from "redux";
   import { Provider } from "react-redux";
   import rootReducer from "./reducers/rootReducer";
   
   const store = createStore(rootReducer);
   
   ReactDOM.render(
     <Provider store={store}>
       <App />,
     </Provider>,
     document.getElementById("root")
   );
   
   // If you want your app to work offline and load faster, you can change
   // unregister() to register() below. Note this comes with some pitfalls.
   // Learn more about service workers: https://bit.ly/CRA-PWA
   serviceWorker.unregister();
   
   ```

4. 当需要更新状态树中的信息时，使用引入的`action`作为函数进行更新。

   ```js
   // Login.jsx
   
   import { connect } from "react-redux";
   import { updateId, updateToken } from "../actions/UpdateActions";
   
   class Login extends Component {
     ......  
     sendLoginRequest = () => {
       ......
       this.props.updateId(res.data.id);
       this.props.updateToken(res.data.token);
       ......
     };  
   }
   
   const mapStateToProps = state => {
     return {};
   };
   
   const mapDispatchToProps = dispatch => {
     return {
       updateToken: token => {
         dispatch(updateToken(token));
       },
       updateId: id => {
         dispatch(updateId(id));
       }
     };
   };
   
   export default connect(
     mapStateToProps,
     mapDispatchToProps
   )(withRouter(Login));
   
   ```

5. 当需要使用状态树中的信息时，先调用`react-redux`中的`connect`包裹组件，再使用`this.props`直接调用即可。

   ```js
   // PublishForm.jsx
   
   import { connect } from "react-redux";
   
   class PublishForm extends Component {
       ......
       var UserID = this.props.id;
   	var UserToken = this.props.token;
   	......
   }
       
   const mapStateToProps = state => {
     return {
       id: state.id,
       token: state.token
     };
   };
   
   export default connect(mapStateToProps)(PublishForm);
   ```

### 后端

#### 目录结构

```js
.
│  app.js
│  package-lock.json
│  package.json
│
└─src
    ├─config // 数据库配置
    │      database.js
    │
    ├─controllers // 控制器，获取请求数据并调用models中的方法进行处理并返回结果
    │      apiController.js
    │      msgController.js
    │      userController.js
    │
    ├─models // 实例模型，主要使用Sequelize定义的方法对数据库进行增删改查
    │      bookModel.js
    │      CommentModel.js
    │      orderModel.js
    │      userModel.js
    │
    ├─routes // 路由，不同文件对应不同类型的api接口，分别与授权、功能实现、信息传递有关
    │      api.js
    │      auth.js
    │      msg.js
    │
    └─schema // 数据库表结构，可使用Sequelize自动生成
            book.js
            comment.js
            order.js
            user.js
```

#### 实现细节

##### 路由挂载

当Koa后端监听的端口接收到请求时，会根据`app.js`中的路由规则进行处理，我们将不同类型的接口定义在不同文件中，再通过`router.use()`进行调用，避免发生接口冗乱复杂的情况。

```js
// app.js

const Koa = require("koa");
const json = require("koa-json");
const logger = require("koa-logger");
const KoaRouter = require("koa-router");
const parser = require("koa-bodyparser");
const auth = require("./src/routes/auth.js");
const api = require("./src/routes/api.js");
const msg = require("./src/routes/msg.js");

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
router.use("/msg", msg.routes());
router.use("/api", api.routes());

app.use(router.routes()).use(router.allowedMethods());

app.listen(4113, () => console.log("----------Server Started----------"));

module.exports = app;
```

```js
// auth.js

const auth = require("../controllers/userController.js");
const router = require("koa-router")();

router.get("/user/:id", auth.getUserInfo);
router.post("/login", auth.vertifyUserLogin);
router.post("/signup", auth.signupNewUser);

module.exports = router;
```

```js
// api.js

const api = require("../controllers/apiController.js");
const router = require("koa-router")();

router.get("/getbooks", api.getAllBooks);
router.get("/getorder/:id", api.getOrderInfo);
router.post("/searchbooks", api.searchBooks);
router.post("/publish", api.publishNewBook);
router.post("/confirmorder", api.updateOrderOfTrade);

module.exports = router;
```

```js
// msg.js

const msg = require("../controllers/msgController.js");
const router = require("koa-router")();

router.get("/getcomments", msg.getAllComments);
router.post("/newcomment", msg.publishNewComment);

module.exports = router;
```

## 项目成果

#### 登录注册

Bookizilla能够实现用户注册、用户登录功能，其中对用户注册时需要的数据做了格式处理（如验证Email格式、保证两次密码输入数据相符且不小于6字节等）。如果用户在注册过程中出现错误，则会出现相应提示以指导用户进行正确输入。

**Login.jsx**

![1561970436476](assets/1561970436476.png)

![1561972776319](assets/1561972776319.png)

**Signup.jsx**

![1561971875221](assets/1561971875221.png)

![1561972744681](assets/1561972744681.png)

#### 个人主页

Bookiezilla的主页呈现的是与该用户有关的信息数据（如FAVES、VIEWS等，但由于目前后端并未储存相关数据所以暂用了mocks）及该用户所发布的所有书籍。

**Home.jsx**

![1561972875578](assets/1561972875578.png)

#### 书籍市场

Bookiezilla的书籍市场呈现了所有用户发布的所有书籍，用户可以使用上方的搜索框输入关键词（如书名、标签 、ISBN等）。用户还可点击图书下方按钮以查看具体信息，进而决定是否达成交易，也可点击链接在Amazon中查看书籍的详细介绍。

**Market.jsx**

![1561973962198](assets/1561973962198.png)

![1561974279890](assets/1561974279890.png)

![1561974222054](assets/1561974222054.png)

#### 书籍发布

Bookiezilla允许用户发布书籍，并设置订单的关键信息（如书籍基本信息、交易模式、寻求买家或卖家等）。需要注意的是，由于书籍发布和书籍求购很大一部分内容是重合的，所以此处将二者合并并且给出`TradeParty`选项来使用户选择是想要发布书籍还是求购书籍。

**Publish.jsx**

![1561973513473](assets/1561973513473.png)

![1561973494678](assets/1561973494678.png)

#### 信息发布

Bookiezilla设置了信息发布面板，用于用户之间的沟通交流、信息发布等。用户可直接发布评论或回复他人的评论，从而进行持续性的交流。

**Message.jsx**

![1561974428691](assets/1561974428691.png)