import req from "express/lib/request.js";
import livros from "../models/livro.js";


class LivroController {
//GET
  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find().populate("autor").exec();  
      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    const id = req.params.id;     
    try{
      let livroEncontrado = await livros.findOne({ _id: id }).populate("autor", "nome").exec(); 
      if(livroEncontrado !== null){
        res.status(200).json(livroEncontrado);
      } else{
        res.status(404).send({ message: "Id do livro não encontrado." });
      }
    } catch(erro){
      next(erro);
    }     
  };
    
  static listarLivroPorEditora = async (req, res,next) => {
    const editora = req.query.editora;
    try {
      let editoraEncontrada = await livros.findOne({ "editora": editora }, {});
      if (!editoraEncontrada) {
        return res.status(404).json({ message: "Nenhum livro encontrado para a editora especificada." });
      }else{
        res.status(200).json(editoraEncontrada)
      }
    } catch (erro) {
      next(erro);
    }
  };

  //POST
  static cadastrarLivros = async (req, res, next) => {
    try {
      let novoLivro = new livros(req.body);
      await novoLivro.save();
      res.status(201).send(novoLivro.toJSON(novoLivro));
    } catch (erro) {
      next(erro);
    }
  };

  //PUT
  static atualizarLivro = async (req, res, next) => {
    let id = req.params.id;
    let dadosAtualizacao = req.body;
    try {
      await livros.updateOne({ _id: id }, dadosAtualizacao);
      const livroAtualizado = await livros.findOne({ _id: id });
      res.status(200).json(livroAtualizado);
    } catch (erro) {
      next(erro);
    }
  };

  //DELETE
  static deletarLivro = async (req,res, next) => {
    let id = req.params.id;
    try {
      await livros.deleteOne({ _id: id });
      res.status(200).send({message:"Livro removido com sucesso."});
    } catch(erro){
      next(erro);
    }
  };
   
}
export default LivroController;