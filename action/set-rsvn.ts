'use server'

import { NextResponse } from "next/server"
const nodemailer = require("nodemailer")
import { format } from "date-fns";

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
},
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

type RsvnProps = {
  name: string,
  phone: string,
  email: string,
  message?:string,
  price: number,
  pickupDate: Date | undefined,
  dropDate: Date | undefined, 
}

export const SetRsvn = async ( data:RsvnProps )=>{

  const { name, phone, email, message, price, pickupDate, dropDate } = data;

  if(!email){ return new NextResponse("email is required", { status: 400 }); }

  if(!phone){ return new NextResponse("phone is required", { status: 400 }); }

  try {
    const info = await transporter.sendMail({
      from: "rqdeleon@mybranches.net", 
      to: "rqdeleon@mybranches.net",
      subject: "Message from contanct page",
      html: `<h4>From:</h4> <p style="font-size:18px;" >name: ${name ? name: "no name"}, <b>Email: ${email}</b></p><br /> 
            <h4>Phone number:</h4> <p style="font-size:18px" > ${phone} </p>
            <h4>Message:</h4> <p style="font-size:18px;"> ${message} </p><br /> 
            <h4>Price Shown:</h4> <p style="font-size:18px;"> ${price} </p><br />
            <h4>Pickup Date:</h4> <p style="font-size:18px;"> ${pickupDate ? format(pickupDate, "PPP") : 'not set'} </p><br />  
            <h4>Drop-off Date:</h4> <p style="font-size:18px;"> ${dropDate ? format(dropDate, "PPP") : 'not set'} </p><br />   
            `,
    });
    console.log(info)
  } catch (error) {
  }
}

 