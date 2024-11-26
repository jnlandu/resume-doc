import { chatWithPDF } from "@/app/actions"

// export const runtime = "edge"

export async function POST(req: Request) {
  const { messages } = await req.json()
  return chatWithPDF(messages)
}

