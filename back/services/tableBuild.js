import connectionSQL from "../dbSQL.js";

export default function tableBuild(table) {
    const { headers } = table;
    let query = `CREATE TABLE ${table.title} (
        "id" SERIAL PRIMARY KEY`;
    for (let i = 0; i < headers.length; i++) {
      query += `,"${headers[i]}" TEXT NOT NULL`;
    }
    query += ");";
    connectionSQL.query(query);
};  