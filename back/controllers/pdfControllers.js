import connectionMongo from "../dbMongo.js";
const pdfCollection = connectionMongo.collection("pdf");
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

export async function postPdf(req, res) {
  try {
    pdfCollection.insertOne({pdf:  req.file.buffer});
    // Send to FLASK
    const pdf = req.file.buffer;
    const url = `${process.env.FLASK_URL}/pdf`;
    const config = {
      headers: {
        "Content-Type": "application/pdf",
      },
    };

    await axios
      .post(url, pdf, config)
      .then((response) => {
        // Sort response data keys
        let { data } = response;

        data = data.map((tbl) => {
          const firstRow = tbl.data[0];

          const keyIndex = Object.keys(firstRow).reduce((obj, key) => {
            obj[key] = tbl.headers.findIndex((k) => k === key);
            return obj;
          }, {});

          let sortedKeys = Object.keys(firstRow).sort(
            (a, b) => keyIndex[a] - keyIndex[b]
          );

          tbl.data = tbl.data.map((row) => {
            // Make an object with every key index
            return sortedKeys.reduce((obj, key) => {
              obj[key] = row[key];
              return obj;
            }, {});
          });
          return tbl;
        });

        console.log("sucesso");
        res.send(data);
      })

      .catch((response) => {
        console.log("erro");
        res.send("erro no axios");
      });
  } catch (e) {
    res.send("Erro ao salvar pdf no banco de dados");
  }
};
