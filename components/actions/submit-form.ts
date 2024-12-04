"use server"

import nodemailer from "nodemailer"

function createHtmlTable(data: [string, FormDataEntryValue][]) {
  const tableRows = data
    .map(
      ([key, value]) => `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: left;"><b>${key}</b></td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${value}</td>
      </tr>
    `
    )
    .join("")

  return `
    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left; background-color: #f2f2f2;">Field</th>
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left; background-color: #f2f2f2;">Value</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `
}

export async function submitForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const email = formData.get("Email")

  if (
    !email ||
    email.toString().trim() === "" ||
    !email.toString().includes("@")
  ) {
    return { message: "Valid email is required", type: "error" }
  }

  const title = formData.get("Form title")

  const transporter = nodemailer.createTransport({
    host: "mail.shaw.ca",
    port: 587,
    secure: false, // TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      ciphers: "SSLv3",
    },
  })

  const formEntries = Array.from(formData.entries())
  const emailData = formEntries.filter(([key]) => !key.includes(`$ACTION`))
  const emailBody = emailData
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n\n")
  const emailHTMLBody = createHtmlTable(emailData)
  try {
    await transporter.sendMail({
      from: email as string,
      to: process.env.TO_EMAIL,
      subject: `${title} submission from ${email}`,
      text: emailBody,
      html: emailHTMLBody,
    })
    return {
      message: `Thank you for submitting a request. We will be in touch via email`,
      type: "success",
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      type: "error",
      message: "Error submitting form. Please try again.",
    }
  }
}
