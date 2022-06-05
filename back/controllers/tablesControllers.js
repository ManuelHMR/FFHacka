import tableBuild from "../services/tableBuild.js";
import insertTable from "../services/insertTable.js";

export async function postTables(req, res) {
    const tablesArr = req.body.dados;
    for (let i = 0; i < tablesArr.length; i++){
        tableBuild(tablesArr[i]);
        insertTable(tablesArr[i]);
    }
    res.sendStatus(200);
};
