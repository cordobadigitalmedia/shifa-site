"use server"

import { put } from "@vercel/blob"
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
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // SSL
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // Your Gmail app password
    },
  })

  /**
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
  */

  const formEntries = Array.from(formData.entries())
  const emailData = formEntries.filter(([key]) => !key.includes(`$ACTION`))

  try {
    // Store submission in Vercel Blob
    const submissionData = emailData.map(([key, value]) => ({
      fieldName: key,
      fieldValue: value.toString(),
    }))

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const filename = `form-submissions/${timestamp}-${email
      .toString()
      .replace(/[^a-zA-Z0-9]/g, "-")}.json`

    // Create the submission object
    const submission = {
      title: `${title} submission from ${email}`,
      formName: title?.toString() || "Unknown Form",
      submittedAt: new Date().toISOString(),
      status: "new",
      submissionData: submissionData,
      notes: "",
      email: email.toString(),
    }

    // Upload to Vercel Blob
    const blob = await put(filename, JSON.stringify(submission, null, 2), {
      access: "public",
      contentType: "application/json",
    })

    console.log("Form submission stored:", blob.url)

    // Send email notification
    const adminUrl =
      process.env.VERCEL_ENV === "production"
        ? `https://www.shifa.ca/forms/admin`
        : `${
            process.env.VERCEL_URL
              ? `https://${process.env.VERCEL_URL}`
              : "http://localhost:3000"
          }/forms/admin`

    const emailBody = `New form submission received:

Form: ${title}
Email: ${email}
Submitted: ${new Date().toLocaleString()}

View submission details: ${adminUrl}

This is an automated notification from your website.`

    const emailHTMLBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Form Submission</h2>
        <p><strong>Form:</strong> ${title}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        <div style="margin: 20px 0;">
          <a href="${adminUrl}"
             style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View Submission Details
          </a>
        </div>
        <p style="color: #666; font-size: 14px; margin-top: 20px;">
          This is an automated notification from your website.
        </p>
      </div>
    `

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
    console.error("Error processing form submission:", error)
    return {
      type: "error",
      message: "Error submitting form. Please try again.",
    }
  }
}
