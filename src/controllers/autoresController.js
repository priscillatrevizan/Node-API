import naoEncontrado from "../erros/naoEncontrado.js";
import autores from "../models/autor.js";

class AutorController {
//GET
  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch (erro) {
      res.status(500).json(erro);
    }
  };

  //POST
  static cadastrarAutor = async (req, res, next) => {
    try {
      let novoAutor = new autores(req.body);
      await novoAutor.save();
      res.status(201).send(novoAutor.toJSON(novoAutor));
    } catch (erro) {
      next(erro);
    }
  };

  //PUT
  static atualizarAutor = async (req, res, next) => {
    let id = req.params.id;
    let dadosAtualizacao = req.body;
    try {
      await autores.updateOne({ _id: id }, dadosAtualizacao);
      const autorAtualizado = await autores.findOne({ _id: id });
      res.status(200).json(autorAtualizado);
    } catch (erro) {
      next(erro);} 
  };

  static listarAutorPorId = async (req, res, next) => {
    const id = req.params.id;     
    try{
      let autorEncontrado = await autores.findOne({ _id: id });
      if(autorEncontrado !== null){
        res.status(200).json(autorEncontrado);
      }else{
        next(new naoEncontrado("Id do autor não localizado."))
      }
    } catch(erro){
      next(erro);

    }     
  };
    
  //DELETE
  static deletarAutor = async (req,res, next) => {
    let id = req.params.id;
    try {
      await autores.deleteOne({ _id: id });
      res.status(200).send({message:"Autor removido com sucesso."});
    } catch(erro){
      next(erro);
    } 
  };
}
export default AutorController;