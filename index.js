import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";
import UserRoute from "./routes/UserRoute.js";
import CartRoute from "./routes/CartRoute.js";
import OrderRoute from "./routes/OrderRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import subCategory from "./routes/subCategoryRoutes.js";
import ContactUs from "./routes/ContactUsRoute.js";
import bodyParser from "body-parser";

dotenv.config();

const port = process.env.PORT || 2000;

await db();

const app = new express();

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/product", ProductRoute);
app.use("/users", UserRoute);
app.use("/cart", CartRoute);
app.use("/orders", OrderRoute);
app.use("/category", CategoryRoute);
app.use("/subcategory", subCategory);
app.use("/contactus", ContactUs)


app.listen(port, () => {
  console.log(`API IS RUNNING ON PORT: ${port}`);
});
