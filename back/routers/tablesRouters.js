import express from "express";

import { postTables } from "../controllers/tablesControllers.js";
// middlewares

const tablesRouters = express.Router();

tablesRouters.post("/tables", postTables)

export default tablesRouters;