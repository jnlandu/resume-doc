"use server"

import { writeFile, readFile, readdir } from "fs/promises"
import { join } from "path"
import { StreamingTextResponse } from "ai"
// import { createGroq } from "@ai-sdk/groq"
import { Groq} from "groq-sdk"
import parse from "pdf-parse"
import { readFileSync } from "fs"


const  uploadPDF = async (formData: FormData)  => {
  const file = formData.get("pdf") as File
  const bytes = await file.arrayBuffer()
  const buffer : any  = Buffer.from(bytes)

  const path = join("public", "uploads", file.name)
  await writeFile(path, buffer)

  return { success: true, path }
}

const GROQ_API_KEY = process.env.GROQ_API_KEY
const groq =  new Groq({
  apiKey: GROQ_API_KEY,
})

export async function summarizePDF() {
  try{
    const uploadsDir = join(process.cwd(), "public", "uploads")
  const files = await readdir(uploadsDir)
  const pdfFiles = files.filter((file) => file.endsWith(".pdf"))

  if (pdfFiles.length === 0) {
    return { summary: "No PDF found" }
  }

  const latestPDF = pdfFiles[pdfFiles.length - 1]
  const pdfPath = join(uploadsDir, latestPDF)
  const pdfBuffer =  readFileSync(pdfPath)
  const pdf = await parse(pdfBuffer)
  const pdfContent = pdf.text 

  // console.log("Debugging latestPDF", pdfContent)

  // console.log("Debugging pdfContent", pdfContent)

  const response = await groq.chat.completions.create({
    model: "mixtral-8x7b-32768",
    messages: [
      { role: "system", content: "You are a helpful assistant that summarizes PDF content and documents. Follow the instructions below:\
        Summarize the document like a professional and provide a concise summary. \
        Don't start your summary with a sentence already in the document. \
        Summarize the document in the language it is written. \
        If the document is in English, summarize it in English. \
        If the document is in Spanish, summarize it in Spanish. \
        If the document is in French, summarize it in French. \
        Display prettified output where is possible. \
        " },
      { role: "user", content: `Please summarize the following document:\n\n${pdfContent}` }
    ],
    max_tokens: 150,
  })
  
  return { summary: response.choices[0].message.content }
  }
  catch(err){
    console.log(err)
  }
}
export async function chatWithPDF(messages: { role: string; content: string }[]) {
  const uploadsDir = join(process.cwd(), "public", "uploads")
  const files = await readdir(uploadsDir)
  const pdfFiles = files.filter((file) => file.endsWith(".pdf"))

  if (pdfFiles.length === 0) {
    return new Response("No PDF found", { status: 400 })
  }

  if  (messages.length === 0) {
    return new Response("No messages found", { status: 400 })
  }

  const messageRole : any  = messages[messages.length-1].role
  const messageContent: any =  messages[messages.length-1].content
  // console.log("Debugging messages:", messages)
  // console.log(" -----------------------------")
  // console.log("Debugging messages content:", messageContent)
  // console.log("Debugging messages role:",  messageRole)

  // console.log("Debugging messageRole:", messages[1].role)
  // console.log("Debugging messageContent:", messages[1].content)


  const latestPDF = pdfFiles[pdfFiles.length - 1]
  const pdfPath = join(uploadsDir, latestPDF)
  const pdfBuffer =  readFileSync(pdfPath)
  const pdf = await parse(pdfBuffer)
  const pdfContent = pdf.text 

  const response = await groq.chat.completions.create({
    model: "mixtral-8x7b-32768",
    messages: [
      { role: "system", content: `You are a helpful assistant that answers questions based on the following PDF content:\n\n${pdfContent}
      Answer the questions based on the content of the PDF.
      If you need more context, ask for it.
      Don't provide answers that are not based on the content of the PDF.
      Only answer in the language the user is asking the questoion in.
      If the user asks in English, answer in English.
      If the user asks in Spanish, answer in Spanish.
      If the user asks in French, answer in French.
      If the use asks in Lingala, answer in Lingala.
      If the user asks in Swahili, answer in Swahili.
      if the user asks in Kikongo, answer in Kikongo.
      If the user asks in Tshiluba, answer in Tshiluba.
      Display prettified output where is possible. 
      Where you have bullet points, display them as bullet points.
      Where you have numbered lists, display them as numbered lists.
      Where you have tables, display them as tables.
      Where you have code snippets, display them as code snippets.
      Where you have images, display them as images.
      Where you have links, display them as links.
      Where you have bold text, display them as bold text.
      Where you have italic text, display them as italic text.
      Where you have underlined text, display them as underlined text.
      Where you have titles or headings, display them as titles or headingss  
      ` },
      { role: messageRole, content: messageContent }
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
  // console.log("Debugging response:", response)
  // console.log("Debugging stream:", stream)
  return new StreamingTextResponse(stream)
}


export default  uploadPDF
