import nodemailer from "nodemailer"

export const sendEmail = async(contentHTML: string ) =>{
  try{
  
  const transporter = nodemailer.createTransport({
    host: process.env.FUNDACION_OXIGENO_SMTP_SERVER,
    port:  465,
    auth: {
      user:  process.env.FUNDACION_OXIGENO_SMTP_USER, // generated ethereal user
      pass: process.env.FUNDACION_OXIGENO_SMTP_PASSWORD, // generated ethereal password
    }
  });

  let mailOptions = {
    from: process.env.FUNDACION_OXIGENO_SMTP_FROM,
    to: process.env.FUNDACION_OXIGENO_SMTP_TO,
    subject: "Formulario de Contacto - Fundacion Oxigeno",
    html: contentHTML,
  };

  await transporter.sendMail(mailOptions);
  }catch(error){
    console.log(error);
  }
}
