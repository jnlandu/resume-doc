import { NextResponse } from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';

async function getImageType(base64String: string): Promise<'png' | 'jpeg' | 'unknown'> {
  
  console.log('Checking image type for:', base64String.substring(0, 100) + '...'); // 
  // Check the base64 header
  // Check for data URL format
  if (base64String.startsWith('data:')) {
    console.log('Found data URL format');
    if (base64String.includes('data:image/png')) {
      console.log('Detected PNG from data URL');
      return 'png';
    }
    if (base64String.includes('data:image/jpeg') || base64String.includes('data:image/jpg')) {
      console.log('Detected JPEG from data URL');
      return 'jpeg';
    }
  }
  
  // If it's raw base64, try to detect from the content
  try {
    let imageData = base64String;
    if (base64String.includes('base64,')) {
      imageData = base64String.split('base64,')[1];
    }
    
    const decoded = Buffer.from(imageData, 'base64');
    console.log('First bytes:', decoded[0], decoded[1], decoded[2], decoded[3]);

    // PNG signature: 89 50 4E 47
    if (decoded[0] === 0x89 && decoded[1] === 0x50 && decoded[2] === 0x4E && decoded[3] === 0x47) {
      console.log('Detected PNG from bytes');
      return 'png';
    }
    
    // JPEG signature: FF D8 FF
    if (decoded[0] === 0xFF && decoded[1] === 0xD8 && decoded[2] === 0xFF) {
      console.log('Detected JPEG from bytes');
      return 'jpeg';
    }
  } catch (e) {
    console.error('Error during image type detection:', e);
  }

  console.log('Could not detect image type');
  return 'unknown';
}




export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      file, 
      watermarkType,
      watermarkText, 
      watermarkImage,
      watermarkColor, 
      watermarkOpacity, 
      watermarkPosition,
      watermarkImageSize 
    } = body;

    // Validation checks...
    if (!file) {
      return NextResponse.json({ message: 'Missing PDF file' }, { status: 400 });
    }
    //  Validate the request body
    if (!file || (watermarkType === 'text' && !watermarkText) || (watermarkType === 'image' && !watermarkImage)) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    if (watermarkType === 'image' && !watermarkImage) {
      return NextResponse.json(
        { message: 'Missing watermark image' },
        { status: 400 }
      );
    }

    // Decode the base64 file
    const pdfBytes = Buffer.from(file, 'base64');

    // Load the PDF document
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Get the first page
    const pages = pdfDoc.getPages();
    for (const page of pages) {
      const { width, height } = page.getSize();

      if (watermarkType === 'text') {
        // Text watermark logic
        const fontSize = 50;
        const textWidth = fontSize * watermarkText.length * 0.5;
        const textHeight = fontSize;

        // Calculate position for text
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

        page.drawText(watermarkText, {
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
      } else {
        // Image watermark logic
        try {
          let imageData = watermarkImage;
          console.log('Processing image watermark...');
          
          // Extract base64 data if it's a data URL
          if (imageData.includes('base64,')) {
            console.log('Found base64 data URL');
            imageData = imageData.split('base64,')[1];
          }

          const imageBytes = Buffer.from(imageData, 'base64');
          console.log('Successfully created image buffer');
          
         // Detect image type
          const imageType = await getImageType(watermarkImage);
          console.log('Detected image type:', imageType);
          let image;
          
          if (imageType === 'png') {
            console.log('Embedding PNG image');
            image = await pdfDoc.embedPng(imageBytes);
          } else if (imageType === 'jpeg') {
            console.log('Embedding JPEG image');
            image = await pdfDoc.embedJpg(imageBytes);
          } else {
            // Try both formats if detection failed
            try {
              console.log('Trying PNG embedding...');
              image = await pdfDoc.embedPng(imageBytes);
            } catch (pngError) {
              console.log('PNG failed, trying JPEG...');
              try {
                image = await pdfDoc.embedJpg(imageBytes);
              } catch (jpgError) {
                console.error('PNG error:', pngError);
                console.error('JPG error:', jpgError);
                throw new Error('Could not process image. Please ensure it is a valid PNG or JPEG file.');
              }
            }
          }

          // Calculate scaled dimensions while maintaining aspect ratio
          const scale = watermarkImageSize / Math.max(image.width, image.height);
          const imgDims = {
            width: image.width * scale,
            height: image.height * scale
          };

          // Calculate position
          let x = 0;
          let y = 0;
          switch (watermarkPosition) {
            case 'top-left':
              x = 10;
              y = height - imgDims.height - 10;
              break;
            case 'top-center':
              x = (width - imgDims.width) / 2;
              y = height - imgDims.height - 10;
              break;
            case 'top-right':
              x = width - imgDims.width - 10;
              y = height - imgDims.height - 10;
              break;
            case 'bottom-left':
              x = 10;
              y = 10;
              break;
            case 'bottom-center':
              x = (width - imgDims.width) / 2;
              y = 10;
              break;
            case 'bottom-right':
              x = width - imgDims.width - 10;
              y = 10;
              break;
          }

          page.drawImage(image, {
            x,
            y,
            width: imgDims.width,
            height: imgDims.height,
            opacity: watermarkOpacity / 100,
          });
        } catch (error: any) {
          console.error('Error processing image watermark:', error);
          return NextResponse.json(
            { message: `Failed to process image watermark: ${error.message}` },
            { status: 400 }
          );
        }
      }
    }

    const pdfBytesWithWatermark = await pdfDoc.save();
    const base64Pdf = Buffer.from(pdfBytesWithWatermark).toString('base64');
    
    return NextResponse.json({ file: base64Pdf }, { status: 200 });
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json(
      { message: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}