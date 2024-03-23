import { NextResponse, NextRequest  } from "next/server";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
},
  auth: {
    user: "rqdeleon@mybranches.net",
    pass: "FS-5}%VcDpX.8j5",
  }
});

export async function Mail() {
  // send mail with defined transport object
  try{
    const info = await transporter.sendMail({
      from: '"ralf" <rqdeleon@mybranches.net>', // sender address
      to: "rqdeleon77@yahoo.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    return NextResponse.json({ message: "Success: email was sent" })

  } catch (err){
    NextResponse.json({ message: "COULD NOT SEND MESSAGE" })
  }

}

