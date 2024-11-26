"use server"

import { writeFile, readFile, readdir } from "fs/promises"
import { join } from "path"
import { StreamingTextResponse } from "ai"
import { createGroq } from "@ai-sdk/groq"
import { Groq} from "groq-sdk"

const  uploadPDF = async (formData: FormData)  => {
  const file = formData.get("pdf") as File
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const path = join("public", "uploads", file.name)
  await writeFile(path, buffer)

  return { success: true, path }
}

const GROQ_API_KEY = process.env.GROQ_API_KEY
const groq =  new Groq({
  apiKey: GROQ_API_KEY,
})

export async function summarizePDF() {
  const uploadsDir = join(process.cwd(), "public", "uploads")
  const files = await readdir(uploadsDir)
  const pdfFiles = files.filter((file) => file.endsWith(".pdf"))

  if (pdfFiles.length === 0) {
    return { summary: "No PDF found" }
  }

  const latestPDF = pdfFiles[pdfFiles.length - 1]
  const pdfPath = join(uploadsDir, latestPDF)
  const pdfContent = await readFile(pdfPath, "utf-8")

  console.log("Debugging pdfContent", pdfContent)

  const response = await groq.chat.completions.create({
    model: "mixtral-8x7b-32768",
    messages: [
      { role: "system", content: "You are a helpful assistant that summarizes PDF content." },
      { role: "user", content: `Please summarize the following PDF content:\n\n${pdfContent}` }
    ],
    max_tokens: 150,
  })
  
  return { summary: response.choices[0].message.content }
}

export async function chatWithPDF(messages: { role: string; content: string }[]) {
  const uploadsDir = join(process.cwd(), "public", "uploads")
  const files = await readdir(uploadsDir)
  const pdfFiles = files.filter((file) => file.endsWith(".pdf"))

  if (pdfFiles.length === 0) {
    return new Response("No PDF found", { status: 400 })
  }

  const latestPDF = pdfFiles[pdfFiles.length - 1]
  const pdfPath = join(uploadsDir, latestPDF)
  const pdfContent = await readFile(pdfPath, "utf-8")

  const response = await groq.chat.completions.create({
    model: "mixtral-8x7b-32768",
    messages: [
      { role: "system", content: `You are a helpful assistant that answers questions based on the following PDF content:\n\n${pdfContent}` },
      // ...messages
    ],
    stream: true,
  })

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        const text = chunk.choices[0]?.delta?.content || ''
        controller.enqueue(new TextEncoder().encode(text))
      }
      controller.close()
    },
  })
  console.log("Debugging response", response)
  console.log("Debugging stream", stream)
  return new StreamingTextResponse(stream)
}


export default  uploadPDF
