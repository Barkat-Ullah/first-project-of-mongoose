import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // true for port 465, false for other ports
    auth: {
      user: 'barkatullah585464@gmail.com',
      pass: 'kdgj mzdt fhoq dhjs',
    },
  });

  await transporter.sendMail({
    from: 'barkatullah585464@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password with in ten mins !!', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
