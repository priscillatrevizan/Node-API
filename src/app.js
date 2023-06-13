import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";


db.on("erro", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
    console.log ('Conexão realizada com sucesso')
})

const app = express();
app.use(express.json());
routes(app);

export default app



