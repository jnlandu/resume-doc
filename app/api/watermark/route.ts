import { NextResponse } from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { file, watermarkText, watermarkColor, watermarkOpacity, watermarkPosition } = body;

    if (!file || !watermarkText) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Decode the base64 file
    const pdfBytes = Buffer.from(file, 'base64');

    // Load the PDF document
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Get the first page
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Define watermark properties
    const { width, height } = firstPage.getSize();
    const fontSize = 50;
    const textWidth = fontSize * watermarkText.length * 0.5;
    const textHeight = fontSize;

    // Calculate position
    let x = 0;
    let y = 0;
    switch (watermarkPosition) {
      case 'top-left':
        x = 10;
        y = height - textHeight - 10;
        break;
      case 'top-center':
        x = (width - textWidth) / 2;
        y = height - textHeight - 10;
        break;
      case 'top-right':
        x = width - textWidth - 10;
        y = height - textHeight - 10;
        break;
      case 'bottom-left':
        x = 10;
        y = 10;
        break;
      case 'bottom-center':
        x = (width - textWidth) / 2;
        y = 10;
        break;
      case 'bottom-right':
        x = width - textWidth - 10;
        y = 10;
        break;
    }

    // Add watermark to the first page
    firstPage.drawText(watermarkText, {
      x,
      y,
      size: fontSize,
      color: rgb(
        parseInt(watermarkColor.slice(1, 3), 16) / 255,
        parseInt(watermarkColor.slice(3, 5), 16) / 255,
        parseInt(watermarkColor.slice(5, 7), 16) / 255
      ),
      opacity: watermarkOpacity / 100,
    });

    // Serialize the PDFDocument to bytes
    const pdfBytesWithWatermark = await pdfDoc.save();

    // Convert to base64 and send back
    const base64Pdf = Buffer.from(pdfBytesWithWatermark).toString('base64');
    
    return NextResponse.json({ file: base64Pdf }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}