import mongoose from "mongoose";
import ErroBase from "../erros/erroBase.js"; 
import requisicaoIncorreta from "../erros/requisicaoIncorreta.js";
import ErroValidacao from "../erros/erroValidacao.js";
import naoEncontrado from "../erros/naoEncontrado.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new requisicaoIncorreta().enviarResposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(erro).enviarResposta(res); 
  } else if (erro instanceof naoEncontrado) {
    erro.enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;