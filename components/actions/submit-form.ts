"use server"

import nodemailer from "nodemailer"

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
  const emailBody = formEntries
    .filter(([key, value]) => !key.includes(`$ACTION`))
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n\n")
  try {
    await transporter.sendMail({
      from: email as string,
      to: process.env.TO_EMAIL,
      subject: `${title} submission from ${email}`,
      text: emailBody,
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
