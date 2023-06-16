import ErroBase from "./erroBase.js";

class naoEncontrado extends ErroBase {
  constructor(mensagem = "Pagina não encontrada") {
    super(mensagem, 404);
  }
}
export default naoEncontrado;