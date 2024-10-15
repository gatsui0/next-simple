import Image from "next/image";
import Logo from "./drawable/logo.png";

export default function Home() {
  return (
      <main className="flex justify-center content-center h-screen w-screen flex-col">
        <div className="grid basis-1/2 w-10 flex-1 content-center justify-items-center bg-slate-50">
            <Image src={Logo} className="" alt="" width={600} height={600}></Image>
        </div>
        <div>
            <div className="border-2 border-gray-900 p-3">
                <p>Olá,</p>
                <p className="t-3">Redefina sua senha de acesso clicando no link abaixo.</p>
                <a className="t-2">https/trajetonbdchabvuyhbvayrbvyubrvyhv.senha</a>
                <p className="text-red-500 t-2">O link expira em 24 horas</p>
            </div>
        </div>
        
      </main>
  );
}
