import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//routers

let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Servidor ligado na porta ${port}`)
});