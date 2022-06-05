import express from "express";
import upload from "../middlewares/multer.js";
import { postPdf } from "../controllers/pdfControllers.js";
// middlewares

const pdfRouters = express.Router();

pdfRouters.post("/pdf", upload.single("pdf"), postPdf);

export default pdfRouters;
