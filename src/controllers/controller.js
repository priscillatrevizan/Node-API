import req from "express/lib/request.js";
import livros from "../models/livro.js";


class LivroController {
//GET
    static listarLivros = async (req, res) => {
        try {
            const livrosResultado = await livros.find().populate('autor').exec();  
            res.status(200).json(livrosResultado)
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static listarLivroPorId = async (req, res) => {
        const id = req.params.id;     
        try{
            let livroEncontrado = await livros.findOne({ _id: id }).populate('autor', 'nome').exec(); 
            res.status(200).json(livroEncontrado);
        } catch(err){
            res.status(400).send({message:`${err.message} - Id do livro não localizado.`});
        }     
    }
    
    static listarLivroPorEditora = async (req, res) => {
        const editora = req.query.editora;
        try {
          let editoraEncontrada = await livros.findOne({ 'editora': editora }, {});
          if (!editoraEncontrada) {
            return res.status(404).json({ message: 'Nenhum livro encontrado para a editora especificada.' });
          }
          res.status(200).json(editoraEncontrada);
        } catch (err) {
          res.status(400).send({ message: `${err.message} - Erro ao buscar livro por editora.` });
        }
      }

//POST
    static cadastrarLivros = async (req, res) => {
        let novoLivro = new livros (req.body)
        try {
            await livros.create(novoLivro)
            res.status(201).send(novoLivro.toJSON(novoLivro))
        } catch (err) {
            res.status(500).send({message: `${err.message} - Falha ao cadastrar livro.`})}    
    }

//PUT
    static atualizarLivro = async (req, res) => {
        let id = req.params.id;
        let dadosAtualizacao = req.body;
        try {
            await livros.updateOne({ _id: id }, dadosAtualizacao)
            const livroAtualizado = await livros.findOne({ _id: id })
            res.status(200).json(livroAtualizado);
        } catch (err) {
            res.status(500).send({message:`${err.message} - Falha ao atualizar livro.`});
        }
    }

//DELETE
    static deletarLivro = async (req,res) => {
        let id = req.params.id;
        try {
            await livros.deleteOne({ _id: id })
            res.status(200).send({message:`Livro removido com sucesso.`});
        } catch(err){
            res.status(400).json({message:`${err.message} - Erro ao remover livro.`});
        }
    }
   
}
export default LivroController;