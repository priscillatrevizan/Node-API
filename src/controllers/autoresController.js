import req from "express/lib/request.js";
import autores from "../models/autor.js";


class AutorController {
//GET
    static listarAutores = async (req, res) => {
        try {
            const autoresResultado = await autores.find();
            res.status(200).json(autoresResultado)
        } catch (err) {
            res.status(500).json(err);
        }
    }

//POST
    static cadastrarAutor = async (req, res) => {
        let novoAutor = new autores (req.body)
        try {
            await autores.create(novoAutor)
            res.status(201).send(novoAutor.toJSON(novoAutor))
        } catch (err) {
            res.status(500).send({message: `${err.message} - Falha ao cadastrar autor.`})}    
    }

//PUT
    static atualizarAutor = async (req, res) => {
        let id = req.params.id;
        let dadosAtualizacao = req.body;
        try {
            await autores.updateOne({ _id: id }, dadosAtualizacao)
            const autorAtualizado = await autores.findOne({ _id: id })
            res.status(200).json(autorAtualizado);
        } catch (err) {
            res.status(500).send({message:`${err.message} - Falha ao atualizar autor.`});
        }
    }

    static listarAutorPorId = async (req, res) => {
        const id = req.params.id;     
        try{
            let autorEncontrado = await autores.findOne({ _id: id })
            res.status(200).json(autorEncontrado);
        } catch(err){
            res.status(400).send({message:`${err.message} - Id do autor não localizado.`});
        }     
    }
    
//DELETE
    static deletarAutor = async (req,res) => {
        let id = req.params.id;
        try {
            await autores.deleteOne({ _id: id })
            res.status(200).send({message:`Autor removido com sucesso.`});
        } catch(err){
            res.status(400).json({message:`${err.message} - Erro ao remover autor.`});
        }
    }
}
export default AutorController;