"use server"

import nodemailer from "nodemailer"

export async function submitForm(prevState: any, formData: FormData) {
  // Simulate a delay

  await new Promise((resolve) => setTimeout(resolve, 1000))

  const email = formData.get("useremail")

  if (
    !email ||
    email.toString().trim() === "" ||
    !email.toString().includes("@")
  ) {
    return { message: "Valid email is required", type: "error" }
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  })

  const formEntries = Array.from(formData.entries())
  const emailBody = formEntries
    .filter(([key, value]) => !key.includes(`$ACTION`))
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n\n")

  console.log(emailBody)
  try {
    await transporter.sendMail({
      from: email as string,
      to: process.env.TO_EMAIL,
      subject: `Counseling Request from ${email}`,
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
