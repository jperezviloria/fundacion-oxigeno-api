import {QueryResult} from "pg";
import {pool} from "../config/database";
import {ContactFormRequest} from "../dto/request/ContactFormRequest";






export const saveContactForm = async(contactForm: ContactFormRequest) =>{
    try{
      
        const newUser : QueryResult = await pool.query(`INSERT INTO contactform (name, email, phone, description, country, dates, enable) VALUES ('${contactForm.name}', '${contactForm.email}','${contactForm.phone}','${contactForm.description}','${contactForm.country}', '${contactForm.date}', ${contactForm.enable});`)
        return "saved"
    }catch(error){
        return "no saved"
    }
    
    
}


export const getAllContactForm = async () =>{
  try{
    const allContactForms : QueryResult = await pool.query(`SELECT * FROM ContactForm ORDER BY dates DESC ` )
    return allContactForms.rows
  }catch(error){
    console.log(error);
  }
}

export const getContactFormWhenIdFalse = async () =>{
  try{
    const allContactForms : QueryResult = await pool.query(`SELECT * FROM ContactForm WHERE enable = false ORDER BY dates DESC ` )
    return allContactForms.rows
  }catch(error){
    console.log(error);
  }
}

export const changeStatusContactForm = async (id: number) =>{
  try{
    const query : QueryResult = await pool.query(`UPDATE ContactForm SET enable = true WHERE id = ${id}` )
    return "changed"
  }catch(error){
    console.log(error);
  }
}

export const getContactFormById = async(idContactForm: number) =>{
    const query= await pool.query(`SELECT * FROM ContactForm WHERE id = ${idContactForm}`)
    return query.rows[0]
}
