'use client';

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUp, FileText, Loader2, FileIcon } from "lucide-react"
import uploadPDF from "@/app/actions"

const PDFUploader = () => {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<{name: string, url: string} | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("pdf", file)

      const result = await uploadPDF(formData)
      
      // Assuming uploadPDF returns an object with file details
      setUploadedFile({
        name: file.name,
        url: result?.fileUrl || '' // Adjust based on your actual return type
      })
    } catch (err) {
      setError("Failed to upload PDF. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload only PDF files')
        setFile(null)
        return
      }
      
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size should not exceed 10MB')
        setFile(null)
        return
      }
      
      setFile(selectedFile)
      setError(null)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
        <CardTitle className="text-2xl font-bold text-purple-800 flex items-center">
          <FileText className="mr-2 w-6 h-6" />
          Upload PDF
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {uploadedFile ? (
          <div className="flex items-center space-x-4 bg-green-50 p-4 rounded-lg">
            <FileIcon className="w-10 h-10 text-green-500" />
            <div>
              <p className="font-medium text-green-800">{uploadedFile.name}</p>
              <p className="text-sm text-green-600">Successfully Uploaded</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label 
                htmlFor="file-upload" 
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileUp className="w-10 h-10 text-purple-500 mb-2" />
                  <p className="mb-2 text-sm text-gray-500">
                    {file ? file.name : "Click to upload PDF"}
                  </p>
                  <p className="text-xs text-gray-400">PDF files up to 10MB</p>
                </div>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
              </label>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              disabled={!file || loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload PDF"
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

export default PDFUploader