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
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import  passport from "passport";
import IntaSend from "intasend-node";
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

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dating app Express API with Swagger",
      version: "0.1.0",
      description:
        "This is aDating app API made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "skills with arif",
        url: "peter.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);



app.get("/", (req, res) => {
  res.send("hello world of dates");
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


// pyments
const PUBLISHABLE_KEY = 'ISPubKey_live_3e699d41-8880-4894-a77b-644e83645a09';
const SECRET_KEY = 'ISSecretKey_live_a41f7e91-ea32-47e3-94a5-a6df165e184b';
async function PaymentCallback(paymentServerResponse) {
  const paymentApiCallbackUrl =
    "https://us-central1-akcreative-fb419.cloudfunctions.net/intersendPaymentCallback";
  const requestData = paymentServerResponse;

  try {
    const response = await fetch(paymentApiCallbackUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    // const responseData = await response.json();
    // console.log(responseData); // You can handle the response data as needed
  } catch (error) {
    console.error("Error sending payment callback:", error);
  }
}
app.post('/authenticate', (req, res) => {
  let intasend = new IntaSend({
      PUBLISHABLE_KEY: PUBLISHABLE_KEY,
      SECRET_KEY: SECRET_KEY,
      test_mode: false,
  });
  intasend.authenticate()
      .then((response) => {
          console.log(response);
          res.send(response);
      })
      .catch((error) => {
          console.log(error);
          res.send(error);
      });
});
async function PayoutCallback(payoutServerResponse) {
  const payoutApiCallbackUrl =
    "https://us-central1-akcreative-fb419.cloudfunctions.net/intersendWithdrawCallback";
  const requestData = payoutServerResponse;

  try {
    const response = await fetch(payoutApiCallbackUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    // const responseData = await response.json();
    // console.log(responseData); // You can handle the response data as needed
  } catch (error) {
    console.error("Error sending payment callback:", error);
  }
}

// create a route to update PaymentCallbackUrl
app.post("/paymentCallbackUrl", (req, res) => {
  PaymentCallbackUrl = req.body.paymentCallbackUrl;
  console.log(PaymentCallbackUrl);
  res.send("Payment Callback URL Updated: " + PaymentCallbackUrl);
});

// create a route to update PayoutCallbackUrl
app.post("/payoutCallbackUrl", (req, res) => {
  PayoutCallbackUrl = req.body.payoutCallbackUrl;
  console.log(PayoutCallbackUrl);
  console.log("success");
  res.send("Payout Callback URL Updated: " + PayoutCallbackUrl);
});

// ####  Processing payout begin  here #### //

// checkout function

const intaSend = new IntaSend(
  'ISPubKey_test_9b64a482-47ee-4a15-9042-0e7e1f17f44b',
  'ISSecretKey_test_3bd9e00b-b8eb-4b5e-8c3c-c608f85349ec',
  true // Test mode: Set true for the test environment
);


app.post('/checkout', (req, res) => {
  const collection = intaSend.collection();

  collection.charge({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      host: 'https://yourwebsite.com',
      
      amount: req.body.amount,
      currency: req.body.currency,
      api_ref: 'test',
      redirect_url: 'http://example.com/thank-you'
  })
  .then((resp) => {
      // Redirect user to URL to complete payment
      console.log(`Charge Response:`, resp);
      res.json(resp); // Send the response back to the client
  })
  .catch((err) => {
      console.error(`Charge Error:`, err);
      res.status(500).json({ error: 'An error occurred' }); // Send an error response
  });
});


// Processing payout end  here //

// Processing payout begin  here //

// mpesa withdrawal function

app.post("/withdrawMpesa", (req, res) => {

  // make payment
  // console.log(req.body);
  let payouts = intaSend.payouts();
  payouts
    .mpesa({
      currency: req.body.currency,
      transactions: [
        {
          name: req.body.name,
          account: req.body.account,
          amount: req.body.amount,
          currency:req.body.currency,
          narrative: req.body.narrative,
        },
      ],
    })
    .then((resp) => {
      console.log("Payment Request Received");
      // console.log(resp);
      // res.send(resp);
      payouts
        .approve(resp, false)
        .then((resp) => {
          console.log("Approval Response");
          // console.log(resp.body);
          const payoutServerResponse = {
            tracking_id: resp.tracking_id,
            status: resp.status,
            transaction_status: resp.transactions[0].status,
            provider: resp.transactions[0].provider,
            bank_code: resp.transactions[0].bank_code,
            name: resp.transactions[0].name,
            account: resp.transactions[0].account,
            account_type: resp.transactions[0].account_type,
            account_reference: resp.transactions[0].account_reference,
            provider_reference: resp.transactions[0].provider_reference,
            provider_account_name: resp.transactions[0].provider_account_name,
            amount: resp.transactions[0].amount,
            charges: resp.transactions[0].charge,
            narrative: resp.transactions[0].narrative,
            currency: resp.transactions[0].currency,
            created_at: resp.transactions[0].created_at,
            updated_at: resp.transactions[0].updated_at,
            challenge: resp.challenge,
          };
          res.send(payoutServerResponse);
        })
        .catch((err) => {
          console.log(`Payouts Error:`, err);
          res.send(err);
        });
    })
    .catch((err) => {
      console.log(`Payouts Error:`, err);
      res.send(err);
    });
});

// bank withdrawal function

app.post("/withdrawBank", (req, res) => {
  

  // make payment
  console.log(req.body);
  let payouts = intaSend.payouts();
  payouts
    .mpesa({
      currency: req.body.currency,
      transactions: [
        {
          name: req.body.name,
          account: req.body.account,
          bank_code: req.body.bank_code,
          amount: req.body.amount,
          currency:req.body.currency,
          narrative: req.body.narrative,
        },
      ],
    })
    .then((resp) => {
      console.log("Payment Request Received");
      // console.log(resp);
      // res.send(resp);
      payouts
        .approve(resp, false)
        .then((resp) => {
          console.log("Approval Response");
          // console.log(resp);
          res.send(resp);
        })
        .catch((err) => {
          console.log(`Payouts Error:`, err);
          res.send(err);
        });
    })
    .catch((err) => {
      console.log(`Payouts Error:`, err);
      res.send(err);
    });
});

// Processing payout ends here //

// Callback URL - Defination Begins Here //

// payment callback function
app.post("/paymentCheck", (req, res) => {
  console.log("Payment Callback");
  const paymentServerResponse = {
    invoice_id: req.body.invoice_id,
    status: req.body.state,
    amount: req.body.value,
    currency: req.body.currency,
    api_ref: req.body.api_ref,
    email: req.body.account,
    mpesa_reference: req.body.mpesa_reference,
  };
  // console.log(paymentServerResponse);
  PaymentCallback(paymentServerResponse);
  res.send(paymentServerResponse);
});

// payout callback function

app.post("/payoutCheck", (req, res) => {
  console.log("Payout Callback");
  // if status is complemted, then send to callback url

  const payoutServerResponse = {
    tracking_id: req.body.tracking_id,
    status: req.body.status,
    transaction_status: req.body.transactions[0].status,
    provider: req.body.transactions[0].provider,
    bank_code: req.body.transactions[0].bank_code,
    name: req.body.transactions[0].name,
    account: req.body.transactions[0].account,
    account_type: req.body.transactions[0].account_type,
    account_reference: req.body.transactions[0].account_reference,
    provider_reference: req.body.transactions[0].provider_reference,
    provider_account_name: req.body.transactions[0].provider_account_name,
    amount: req.body.transactions[0].amount,
    charges: req.body.transactions[0].charge,
    narrative: req.body.transactions[0].narrative,
    currency: req.body.transactions[0].currency,
    created_at: req.body.transactions[0].created_at,
    updated_at: req.body.transactions[0].updated_at,
    challenge: req.body.challenge,
  };

  if (req.body.status === "Completed") {
    PayoutCallback(payoutServerResponse);
  }

  res.send(payoutServerResponse);
});




app.use("/pay",paymentRouter)
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server is  running on port ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
