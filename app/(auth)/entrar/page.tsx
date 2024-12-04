'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'

export default function Entrar() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password
      });

      // Salvar token no localStorage
      localStorage.setItem('token', response.data.token);
      
      // Redirecionar para página de menu
      router.push('/menu');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <form 
      onSubmit={handleLogin} 
      className="flex h-full w-full flex-col items-center justify-center gap-8 bg-background md:h-fit md:w-fit md:flex-row md:justify-between md:rounded-2xl md:p-14"
    >
      <div className="flex flex-col items-center gap-8 px-10">
        <Image
          src="/interview-man.png"
          width={165}
          height={257}
          alt="Interview Man"
        />
        <h1 className="text-center font-bold text-4xl">
          Bem-vindo de
          <br />
          volta!
        </h1>
      </div>
      <div className="flex flex-col gap-5">
        {error && (
          <div className="text-red-500 text-center">
            {error}
          </div>
        )}
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-80 rounded-md border border-white/15 bg-transparent p-2"
            required
          />
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-white/15 bg-transparent p-2"
            required
          />
        </fieldset>
        
        <button 
          type="submit" 
          className="mt-4 w-80 rounded-lg bg-accent/50 p-2 transition-colors hover:bg-accent"
        >
          Entrar
        </button>

        <Link href="/recuperacaoSenha">   
          <button type="button" className="text-sm text-blue-500 hover:underline">
            Esqueceu a senha?
          </button>  
        </Link>
      </div>
    </form>
  )
}