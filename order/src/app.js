import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import responseHandler from "./util/response.handler";
import router from "./api/routes";

const app = express();

// Register Middleware Chain
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Inject Response Handler
app.use((req, res, next) => {
	req.handleResponse = responseHandler;
	next();
});

app.use("/api/order", router);

export default app;
