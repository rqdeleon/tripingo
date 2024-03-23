import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

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

export async function POST(
  req: Request
) {
  const body = await req.json();

  const {name,email,phone,message} = body;

  if(!email){ return new NextResponse("email is required", { status: 400 }); }

  if(!message){ return new NextResponse("message is required", { status: 400 }); }

  // send mail with defined transport object
  try{
    const info = await transporter.sendMail({
      from: "rqdeleon@mybranches.net", 
      to: "rqdeleon@mybranches.net",
      subject: "Inquiry from contact page",
      html: `<h4>From:</h4> <p style="font-size:18px;" >name: ${name ? name: "no name"}, <b>Email: ${email}</b></p><br /> 
             <h4>Message:</h4> <p style="font-size:18px;"> ${message} </p><br /> 
             <h4>Phone number:</h4> <p style="font-size:18px" > ${phone} </p>`,
    });
    console.log(info)
    return  new NextResponse("Email sent successfully", { status: 200 });

  } catch (err){
    return new NextResponse("Email unsuccessfull", { status: 403 });
  }

}

