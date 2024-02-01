import nodemailer from "nodemailer";
import ejs from "ejs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from "path";

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: "gmail",
    auth: {
      user: "worldofhustles@gmail.com",
      pass: "tewcczqvepiskpbm",
    },
  });
  
  const currentModuleURL = import.meta.url;
  const currentModulePath = fileURLToPath(currentModuleURL);
  const currentDir = dirname(currentModulePath);
  
  const { email, subject, template, data } = options;
  const templatePath = path.join(currentDir, "../mails", template);
  const html = await ejs.renderFile(templatePath, data);
 
  var mailOptions = {
    from: "worldofhustles@gmail.com",
    to: email,
    subject,
    html
  };
  
  await transporter.sendMail(mailOptions);
};

export default sendMail;