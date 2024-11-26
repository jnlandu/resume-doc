"use client"

import { useState, useEffect } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
// Use the local worker script
// pdfjs.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.min.js');
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
 
const PDFViewer = ()=>{
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pdfPath, setPdfPath] = useState<string | null>(null)

  useEffect(() => {
    const fetchLatestPDF = async () => {
      const response = await fetch("/api/latest-pdf")
      const data = await response.json()
      if (data.path) {
        setPdfPath(data.path)
      }
    }

    fetchLatestPDF()
  }, [])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  if (!pdfPath) {
    return <div>No PDF uploaded yet.</div>
  }

  return (
    <div className="border rounded-lg p-4 mt-4">
      <Document file={pdfPath} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} width={300} />
        ))}
      </Document>
    </div>
  )
}

export default PDFViewer
