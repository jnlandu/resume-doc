import { readdir } from "fs/promises"
import { join } from "path"

export async function GET() {
  const uploadsDir = join(process.cwd(), "public", "uploads")
  const files = await readdir(uploadsDir)
  const pdfFiles = files.filter((file) => file.endsWith(".pdf"))

  if (pdfFiles.length === 0) {
    return new Response(JSON.stringify({ path: null }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const latestPDF = pdfFiles[pdfFiles.length - 1]
  const pdfPath = `/uploads/${latestPDF}`

  return new Response(JSON.stringify({ path: pdfPath }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

