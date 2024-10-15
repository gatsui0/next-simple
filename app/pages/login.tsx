"use client";

import Image from "next/image";
import Logo from "./drawable/logo.png";
import {  useState } from "react";
import axios from "axios";


export default function Home() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleClick = (ativar:boolean) => {
    setIsVisible(ativar);
  };

  const validarEmail = async (): Promise<void> => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!email) {
      setError('O email não pode estar vazio.');
    } else if (!emailRegex.test(email)) {
      setError('O email é inválido. Certifique-se de que contém "@" e termina com ".com".');
    } else {
      setError('');
    }
    
    try {
      const response = await axios.post('/api/send-reset-email', {
        email,
        resetToken: 'example-token', // Gerar e passar um token real no backend
      });

      setError(response.data);
    } catch (err) {
    }
  };

  const modalRecuperarEmail = () => {
    return(
      <div className={`modal fixed inset-0 flex items-center justify-cente bg-opacity-50 z-50 flex-col bg-black justify-center content-center ${isVisible ? 'block' : 'hidden'}`}>
        <div className=" bg-white p-5 rounded-md flex flex-col shadow-lg w-full max-w-lg overflow-hidden">
          <div className="flex flex-row">
            <p className="flex-1 text-gray-900 font-semibold text-xl">Recuperar Senha</p>
            <button className=" text-black" onClick={() => handleClick(false)}>X</button>
          </div>
          <div>
            <p className="text-black mt-2 text-sm">Para recuperar sua senha, digite o e-mail cadastrado.</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-900 font-semibold mt-5 mb-2">E-mail*</label>
            <input className="border-2 border-slate-300 rounded-md text-black p-1" placeholder="mail.example@gmail.com" type="email" onChange={e => setEmail(e.target.value)}></input>
          </div>
          <p className="text-sm text-red-500 mt-2 flex-nowrapS">{error}</p>
          <button className=" bg-orange-500 text-sm rounded-lg flex mt-5 p-2 justify-center font-medium" onClick={(e) => validarEmail()}>Enviar</button>
        </div>
      </div>
  )};

  const modalEnviadoEmail = () => { 
    return(
      <div className={`modal fixed inset-0 flex items-center justify-cente bg-opacity-50 z-50 flex-col bg-black justify-center content-center`}>
        <div className=" bg-white p-5 rounded-md shadow-lg w-full max-w-lg overflow-hidden w-50 flex flex-col w-96">
          <div className="flex flex-row">
            <p className=" flex-1 text-gray-900 font-semibold text-xl">Recuperar Senha</p>
            <button className="  text-black flex-end" onClick={() => handleClick(false)}>X</button>
          </div>
          <div>
            <p className="text-black mt-3 text-sm">Enviamos um link de recuperação para o seu e-mail cadastrado. Por favor,
              verifique a sua caixa de entrada e a pasta de spam, se necessário.</p>
          </div>
          <p className="text-sm text-red-500 mt-2 flex-nowrapS">{error}</p>
          <button className=" bg-orange-500 text-sm rounded-lg flex mt-5 p-2 justify-center font-medium" >Entendido</button>
        </div>
      </div>
  )}

  return (
    <main className="flex justify-center content-center h-screen w-screen">
      <div className="grid basis-1/2 bg-white w-10 flex-1 content-center justify-items-center">
        <div className="flex flex-col">
          <label className="text-black font-semibold text-sm">E-email*</label>
          <input type="email" className="border-2 border-slate-300 rounded-md bg-white"></input>

          <label className="text-black font-semibold mt-4 text-sm">Senha*</label>
          <input type="password" className="border-2 border-slate-300 rounded-md bg-white"></input>

          <button className="text-sm text-blue-500 mt-2 text-start" onClick={() => handleClick(true)}>Esqueci minha senha</button>

          <button className="bg-orange-500 rounded-md mt-2 text-sm">Entrar</button>
        </div>
      </div>
      <div className="grid basis-1/2 bg-slate-50 w-10 flex-1 content-center justify-items-center">
        <Image src={Logo} className="" alt="" width={600} height={600}></Image>
      </div>

      {modalRecuperarEmail()}
      {modalEnviadoEmail()}
    </main>
  );
}
