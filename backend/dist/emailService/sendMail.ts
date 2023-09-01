import nodemailer from "nodemailer";
interface Config {
  host: string;
  server: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
}
interface Message {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
}

const config: Config = {
  host: "smtp.gmail.com",
  server: "gmail",
  port: 587,
  auth: {
    user: process.env.EMAIL as string,
    pass: process.env.EMAIL_PWD as string,
  },
};

//creating  a transorter function

const createTransporter = (config: Config) => {
  return nodemailer.createTransport(config);
};

const sendMail = async (messageOptions: Message) => {
  const transporter = createTransporter(config);
  await transporter.verify();
  await transporter.sendMail(messageOptions, (err: any, info: any) => {

    return info;
  });
};

export default sendMail;
