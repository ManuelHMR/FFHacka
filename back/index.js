import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import pdfRouters from "./routers/pdfRouters.js";
import tablesRouters from "./routers/tablesRouters.js"

const app = express();
app.use(cors());
app.use(express.json());

app.use(pdfRouters);
app.use(tablesRouters);

let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Servidor ligado na porta ${port}`)
});