import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// This is just for demo purposes - don't use in production!
const tempStorage = new Map<string, string>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { file, fileName } = body;

    if (!file) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: 400 }
      );
    }

    // Generate unique ID
    const fileId = uuidv4();
    
    // Store file in memory (temporary)
    tempStorage.set(fileId, file);

    // Generate share URL
    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/shared/${fileId}`;

    return NextResponse.json({ shareUrl }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: 'Error uploading file' },
      { status: 500 }
    );
  }
}

// Add a GET route to retrieve shared files
export async function GET(request: Request) {
  const url = new URL(request.url);
  const fileId = url.pathname.split('/').pop();

  if (!fileId || !tempStorage.has(fileId)) {
    return NextResponse.json(
      { message: 'File not found' },
      { status: 404 }
    );
  }

  const file = tempStorage.get(fileId);
  return NextResponse.json({ file }, { status: 200 });
}