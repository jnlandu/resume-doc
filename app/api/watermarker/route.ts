// app/api/watermark/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    // Parse multipart form data
    const formData = await request.formData();
    const pdfFile = formData.get('pdf') as File;
    const watermarkText = formData.get('watermarkText') as string;
    const position = formData.get('position') as string;
    const opacity = Number(formData.get('opacity'));
    const rotation = Number(formData.get('rotation'));

    // Read PDF file
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfBytes = new Uint8Array(arrayBuffer);

    // Load PDF document
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Apply watermark to each page
    pages.forEach(page => {
      const { width, height } = page.getSize();
      const textSize = 50;
      
      // Calculate position based on input
      let x = width / 2, y = height / 2;
      switch (position) {
        case 'top-left':
          x = width * 0.1;
          y = height * 0.9;
          break;
        case 'top-center':
          x = width / 2;
          y = height * 0.9;
          break;
        case 'top-right':
          x = width * 0.9;
          y = height * 0.9;
          break;
        case 'bottom-left':
          x = width * 0.1;
          y = height * 0.1;
          break;
        case 'bottom-center':
          x = width / 2;
          y = height * 0.1;
          break;
        case 'bottom-right':
          x = width * 0.9;
          y = height * 0.1;
          break;
      }

      // Draw watermark text
      page.drawText(watermarkText, {
        x,
        y,
        size: textSize,
        font: helveticaFont,
        color: rgb(0.5, 0.5, 0.5),
        opacity: opacity / 100,
        rotate: {
          angle: rotation,
          origin: { x, y }
        }
      });
    });

    // Save watermarked PDF
    const pdfBytesWithWatermark = await pdfDoc.save();
    
    // Generate unique filename
    const filename = `watermarked_${Date.now()}.pdf`;
    const filepath = path.join(process.cwd(), 'public', 'uploads', filename);

    // Ensure uploads directory exists
    fs.mkdirSync(path.join(process.cwd(), 'public', 'uploads'), { recursive: true });

    // Write file
    fs.writeFileSync(filepath, pdfBytesWithWatermark);

    // Return path to watermarked file
    return NextResponse.json({ 
      success: true, 
      path: `/uploads/${filename}` 
    });
  } catch (error) {
    console.error('Watermarking error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to watermark PDF' 
    }, { status: 500 });
  }
}