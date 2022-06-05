import connectionSQL from "../dbSQL.js";

export default function insertTable(table) {
    const { data, headers } = table;
    let query = "";
    data.map((item, index) => {
      query = `
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
};
