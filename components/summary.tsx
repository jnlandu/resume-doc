"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { summarizePDF } from "@/app/actions"

const  Summary = ()=> {
  const [summary, setSummary] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSummarize = async () => {
    setLoading(true)
    const result = await summarizePDF()
    setSummary(result.summary)
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {summary ? (
          <p>{summary}</p>
        ) : (
          <Button onClick={handleSummarize} disabled={loading}>
            {loading ? "Summarizing..." : "Generate Summary"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default Summary

