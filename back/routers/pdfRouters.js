import express from "express";

import { postPdf } from "../controllers/pdfControllers.js";
// middlewares

const pdfRouters = express.Router();

pdfRouters.post("/pdf", postPdf)

export default pdfRouters;