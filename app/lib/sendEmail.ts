// lib/sendEmail.ts
import nodemailer from 'nodemailer';

// Configurar o transportador de email (exemplo com Gmail)
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Ou outro serviço de e-mail
  auth: {
    user: process.env.EMAIL_USER, // Seu e-mail
    pass: process.env.EMAIL_PASS, // Sua senha ou App Password
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Seu e-mail
      to,
      subject,
      html,
    });
    console.log('Email enviado com sucesso');
  } catch (error) {
    console.error('Erro ao enviar o email', error);
  }
};
