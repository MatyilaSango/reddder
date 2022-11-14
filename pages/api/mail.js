// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const body = JSON.parse(req.body);

  let nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "Redddermail@gmail.com",
      pass: "lfcrhedcjuafdwnx",
    },
    secure: true,
  });

  const Data = {
    from: body.email,
    to: "Redddermail@gmail.com",
    subject: `Message From ${body.name}`,
    text: body.message + " | sent from " + body.email,
    html: `<div>${body.message}</div><p>Sent from: ${body.email}</p>`,
  };

  transporter.sendMail(Data, function (err, info) {
    if (err) res.status(200).json({ result: "Error. Try again later!" });
    else res.status(200).json({ result: "Sent!" });
  });
}
