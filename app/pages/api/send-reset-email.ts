// pages/api/send-reset-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '../../lib/sendEmail';

const generateResetLink = (token: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, resetToken } = req.body;

    if (!email || !resetToken) {
      return res.status(400).json({ error: 'Email e token são necessários' });
    }

    const resetLink = generateResetLink(resetToken);

    const html = `
      <html>
        <div className="grid basis-1/2 w-10 flex-1 content-center justify-items-center bg-slate-50">
            <Image src={Logo} className="" alt="" width={600} height={600}></Image>
        </div>
        <div>
            <div className="border-2 border-gray-900 p-3">
                <p>Olá,</p>
                <p className="t-3">Redefina sua senha de acesso clicando no link abaixo.</p>
                <a href="${resetLink}">Redefinir Senha</a>
                <p className="text-red-500 t-2">O link expira em 24 horas</p>
            </div>
        </div>
      </html>
    `;

    try {
      await sendEmail(email, 'Redefinição de Senha', html);
      return res.status(200).json({ message: 'Email enviado com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao enviar o email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
