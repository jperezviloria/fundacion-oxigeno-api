import {Request, Response} from "express"
import {} from "../config/nodemailer"
import {ContactFormRequest} from "../dto/request/ContactFormRequest";
//import {} from "../database/ContactFormDatabase"



export const sendContactFormBySmtp = async(request: Request, response:Response) =>{
  
  try{
    let {
      name,
      email,
      description,
      country,
      date,
      phone
    } = request.body;

    const contentHTML : string = `
    <div style="font-family: 'Lato', sans-serif;">
    <h1>Solicitud de atención desde ${country}</h1>
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
            <td>${name}</td>
            <td>${email}</td>
	    <td>${phone}</td>
            <td>${country}</td>
            <td>${description}</td>
            <td>${date}</td>
        </tr>
    </table>
    </div>
    `;

    console.log(contentHTML);

    return response.json(request.body)

  }catch(error){}
}
