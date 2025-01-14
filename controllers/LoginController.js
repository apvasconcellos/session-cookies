const bcrypt = require("bcryptjs");
const UsuarioModel = require("../models/Usuario");

exports.criarUsuario = (nome, email, senha) => {
  const senhaCriptografada = bcrypt.hashSync(senha);

  const usuario = UsuarioModel.criarUmUsuario(nome, email, senhaCriptografada);
  
  return usuario;
}