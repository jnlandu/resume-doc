'use client';

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { summarizePDF } from "@/app/actions"
import { Loader2 } from "lucide-react"

const Summary = () => {
  const [summary, setSummary] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSummarize = async () => {
    setLoading(true)
    try {
      const result = await summarizePDF()
      setSummary(result!.summary)
    } catch (error) {
      console.error("Failed to generate summary:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
        <CardTitle className="text-2xl font-bold text-blue-800 flex items-center justify-between">
          PDF Summary
          {summary && (
            <span className="text-sm text-blue-600 font-normal">
              {new Date().toLocaleDateString()}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="min-h-[200px] flex items-center justify-center p-6">
        {loading ? (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            <p className="text-gray-600">Generating summary...</p>
          </div>
        ) : summary ? (
          <div className="space-y-4">
            <p className="text-base text-gray-800 text-justify leading-relaxed">
              {summary}
            </p>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-gray-600 mb-4">
              Click the button below to generate a summary of your PDF document.
            </p>
            <Button 
              onClick={handleSummarize} 
              className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Generate Summary
            </Button>
          </div>
        )}
      </CardContent>
      {!summary && !loading && (
        <CardFooter className="border-t bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-500">
            Summary will appear here after generation
          </p>
        </CardFooter>
      )}
    </Card>
  )
}

export default Summary