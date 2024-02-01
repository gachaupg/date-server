import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import userRouter from "./routes/auth.js";
import authRoute from "./routes/authSocial.js";
import categoryRouter from "./routes/Categories.js";
import userContentsRouter from "./routes/Products.js";
import commentsRouter from "./routes/Products.js";
import podicastRouter from "./routes/scripts.js";
import messageRouter from "./routes/message.js";
import orderRouter from "./routes/orders.js";
import notRouter from "./routes/notifications.js";
import chatRouter from "./routes/chats.js";
import bodyParser from "body-parser";
import passportSetup from "passport";
import  cookieSession from "cookie-session";
import paymentRouter from "./routes/payment.js"
import pmgRouter from './routes/pmg.js'
// cross origin options
import  passport from "passport";
const app = express();
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};



// port 
const PORT = process.env.PORT;

// middlewares


app.set("view engine", "ejs");
dotenv.config();
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(cors(corsOptions));

// welcome route

app.get("/", (req, res) => {
  res.send("hello world of and   Hustles");
});

// all apis  app
app.use("/users", userRouter);
app.use('/products',userContentsRouter)
app.use('/comments', commentsRouter)
app.use('/scripts', podicastRouter)
app.use('/chat', chatRouter)
app.use('/message', messageRouter)
app.use('/orders', orderRouter)
app.use('/notifications', notRouter)
app.use('/categories', categoryRouter)
app.use('/pmg', pmgRouter)
// mongo db  conecctions
app.use("/pay",paymentRouter)
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server is  running on port ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
