// app/api/watermark-image/route.ts
import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;
    const watermarkText = formData.get('watermarkText') as string;
    const position = formData.get('position') as string;
    const opacity = Number(formData.get('opacity'));

    // Read image file
    const arrayBuffer = await imageFile.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    // Get image metadata
    const metadata = await sharp(imageBuffer).metadata();

    // Create watermark
    const watermarkBuffer = await sharp({
      create: {
        width: metadata.width || 800,
        height: metadata.height || 600,
        channels: 4,
        background: { r: 128, g: 128, b: 128, alpha: opacity / 100 }
      }
    })
    .composite([{
      input: Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${metadata.width}" height="${metadata.height}">
          <text 
            x="50%" 
            y="50%" 
            fill="rgba(255,255,255,0.5)" 
            font-size="50" 
            text-anchor="middle" 
            alignment-baseline="middle"
          >
            ${watermarkText}
          </text>
        </svg>`
      ),
      top: 0,
      left: 0
    }])
    .png()
    .toBuffer();

    // Apply watermark
    const outputBuffer = await sharp(imageBuffer)
      .composite([{
        input: watermarkBuffer,
        blend: 'over'
      }])
      .toBuffer();

    // Generate unique filename
    const filename = `watermarked_${Date.now()}.${metadata.format || 'png'}`;
    const filepath = path.join(process.cwd(), 'public', 'uploads', filename);

    // Ensure uploads directory exists
    fs.mkdirSync(path.join(process.cwd(), 'public', 'uploads'), { recursive: true });

    // Write file
    fs.writeFileSync(filepath, outputBuffer);

    return NextResponse.json({ 
      success: true, 
      path: `/uploads/${filename}` 
    });
  } catch (error) {
    console.error('Image watermarking error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to watermark image' 
    }, { status: 500 });
  }
}