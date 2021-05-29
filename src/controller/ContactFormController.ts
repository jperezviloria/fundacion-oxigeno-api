import {Request, Response} from "express"
import {sendEmail} from "../config/nodemailer"
//import {ContactFormRequest} from "../dto/request/ContactFormRequest";
import {changeStatusContactForm, getAllContactForm, getContactFormWhenIdFalse, saveContactForm} from "../database/ContactFormDatabase"
import moment from "moment"
import {ContactFormRequest} from "../dto/request/ContactFormRequest";


export const sendContactFormBySmtp = async(request: Request, response:Response) =>{
  
  try{
    

    const contactForm : ContactFormRequest = {
      name: request.body.name,
      email: request.body.email,
      description: request.body.description,
      country: request.body.country,
      phone: request.body.phone,
      date : moment().format(),
      enable: false
    }
    const contentHTML : string = `
    <div style="font-family: 'Lato', sans-serif;">
    <h1>Solicitud de atención desde ${contactForm.country}</h1>
    <h2>Datos personales</h2>
    <table border="1">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Telefono</th>
                <th>Pais</th>
                <th>description</th>
                <th>fecha</th>

            </tr>
        </thead>
        <tr>
            <td>${contactForm.name}</td>
            <td>${contactForm.email}</td>
	    <td>${contactForm.phone}</td>
            <td>${contactForm.country}</td>
            <td>${contactForm.description}</td>
            <td>${contactForm.date}</td>
        </tr>
    </table>
    </div>
    `;

    console.log(contentHTML);
    await saveContactForm(contactForm)
    await sendEmail(contentHTML);
    
    return response.json({
    "status": 200,
    "message": "the email was sended"
  })
  }catch(error){
    console.log(error)
    return response.json({
      "status":500,
      "message":"error to send email"})
    }

  

  }

  export const getAllContactFormController = async(request: Request, response: Response) =>{
    const allContactForms = await getAllContactForm();
    console.log(allContactForms)
    return response.json({ data: allContactForms})
  }


  export const getContactFormWhenIsFalseController = async(request: Request, response: Response) =>{
    
    const contactFormWhenIsFalse = await getContactFormWhenIdFalse();
    return response.json({ data: contactFormWhenIsFalse})
  }

  export const changeStatusContactFormController = async(request: Request, response: Response) =>{
   
    const id = request.params.id;
    const result = await changeStatusContactForm(parseInt(id));
    return response.json({ data: result})
  }
