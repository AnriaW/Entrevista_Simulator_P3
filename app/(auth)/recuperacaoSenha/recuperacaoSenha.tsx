import React from 'react';

export default function recuperacaoSenha () {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <img src="avatar.png" alt="Avatar" className="login-avatar" />
          <h1>Recuperação de Senha</h1>
        </div>
        <div className="login-right">
          <form>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Digite o email da sua conta" />
            <button type="submit">Recuperar a senha</button>
          </form>
        </div>
      </div>
    </div>
  );
};
