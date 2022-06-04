import connectionMongo from "../dbMongo.js";
const pdfCollection = connectionMongo.collection('pdf')

export async function postPdf(req, res) {
    const { pdf } = req.body;
    try{
        // await pdfCollection.insertOne({pdf})
        res.send('Amigo, voce eh um amigo.')
    } catch (e) {
        res.send('Erro ao salvar pdf no banco de dados')
    }
};