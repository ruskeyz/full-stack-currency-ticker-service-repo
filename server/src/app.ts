import express from "express";
import { apiRouter } from "./api";

const app = express();

app.use(express.json());
app.use("/api", apiRouter);

export { app };
