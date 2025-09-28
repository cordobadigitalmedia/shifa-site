"use server"

import Airtable from "airtable"

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

  const formEntries = Array.from(formData.entries())
  const emailData = formEntries.filter(([key]) => !key.includes(`$ACTION`))

  try {
    // Store submission in Airtable
    const submissionData = emailData.map(([key, value]) => ({
      fieldName: key,
      fieldValue: value.toString(),
    }))

    // Create the submission object
    const submission = {
      title: `${title} submission from ${email}`,
      formName: title?.toString() || "Unknown Form",
      submittedAt: new Date().toISOString(),
      submissionData: submissionData,
      email: email.toString(),
    }

    // Save to Airtable
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
      process.env.AIRTABLE_BASE_ID!
    )

    const record = await base("Form Submissions").create({
      "Form Name": title,
      Email: email,
      "Submitted At": new Date().toISOString(),
      "Form Data": JSON.stringify(submission, null, 2),
    })

    console.log("Form submission stored in Airtable:", record.getId())

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
