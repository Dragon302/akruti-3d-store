const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// 1. CONFIG DOTENV (MUST BE FIRST)
dotenv.config();

// 2. IMPORT ROUTES
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/products");
const cartRoute = require("./routes/cart.js");
const orderRoute = require("./routes/orders");
const paymentRoute = require("./routes/payment"); // The one causing the crash earlier
const messageRoute = require("./routes/messages"); // For Contact Form

// 3. DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => console.log(err));

// 4. MIDDLEWARES
app.use(cors({
  origin: "*", // Allow requests from any frontend (React)
  credentials: true, // Allow cookies/headers
  exposedHeaders: ["x-rtb-fingerprint-id", "Authorization"], // <--- THIS FIXES YOUR ERROR
}));
app.use(express.json());

// 5. USE ROUTES
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute); // Plural 'products' is standard
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/messages", messageRoute);

// 6. START SERVER
app.listen(5000, () => {
  console.log("Backend server is running on port 5000!");
});