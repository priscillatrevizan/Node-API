import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {
      type: String,
      required: [true, "O nome do autor(a) é obrigatório." ]
    },
    nacionalidade: {type: String}
  },
  {
    versionKey: false   //versionamento do banco
  }
);

const autores = mongoose.model("autores", autorSchema);

export default autores;