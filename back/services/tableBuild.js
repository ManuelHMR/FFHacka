import connectionSQL from "../dbSQL.js";

export default function tableBuild(){

    let query = `CREATE TABLE "users" (
        "id" SERIAL PRIMARY KEY,
    `
    

    query += ');'
}