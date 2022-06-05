import connectionSQL from "../dbSQL.js";

export default function tableBuild(table) {
  let { data, headers } = table;

  // Check if there is duplicate headers.
  for (let i = 0, iMax = headers.length; i < iMax; i++) {
    let numSame = 0;
    for (let j = i, jMin = 0; j >= jMin; j--) {
      // console.log(headers[j], headers[i]);
      if (headers[j] == headers[i]) {
        numSame++;
      }
    }
    if (numSame > 1) {
      headers[i] = `${headers[i]}_${numSame}`;
    }
  }

  let query = `
  DROP TABLE IF EXISTS ${table.title};
  
  CREATE TABLE IF NOT EXISTS  ${table.title} (
        "id" SERIAL PRIMARY KEY`;
  for (let i = 0; i < headers.length; i++) {
    query += `,"${headers[i]}" TEXT`;
  }
  query += ");";

  data.map((item, index) => {
    query += `
            INSERT INTO ${table.title} 
            (`;
    for (let i = 0; i < headers.length; i++) {
      if (i === 0) {
        query += `"${headers[i]}"`;
      } else {
        query += `, "${headers[i]}"`;
      }
    }
    query += `) 
            VALUES (`;
    Object.keys(data[index]).map((key, i) => {
      if (i === 0) {
        query += `'${item[key]}'`;
      } else {
        query += `,'${item[key]}'`;
      }
    });
    query += ");";
  });

  connectionSQL.query(query);
}
