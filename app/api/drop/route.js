import { NextResponse } from 'next/server';
import { connectToDb } from '../../../lib/db';
import mongoose from 'mongoose';

// const setCorsHeaders = (res) => {
//     res.headers.set('Access-Control-Allow-Origin', 'https://registration-kohl-ten.vercel.app'); // Your Vercel URL
//     res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
//   };

const allowedOrigins = [
    'https://registration-kohl-ten.vercel.app', 
    'https://register-phi-silk.vercel.app'
  ];
  
  const setCorsHeaders = (req, res) => {
    const origin = req.headers.get('origin');
  
    // Check if the request's origin is in the allowed origins
    if (allowedOrigins.includes(origin)) {
      res.headers.set('Access-Control-Allow-Origin', origin);
    }
  
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  };

export async function DELETE(request) {
    const res = NextResponse.next(); // Create a response object
    setCorsHeaders(res);
    
    try {
        const collectionName = request.nextUrl.searchParams.get("name");
        if (!collectionName) {
            return NextResponse.json({ message: 'Collection name is required' }, { status: 400 });
        }
        
        await connectToDb();
        
        const collection = mongoose.connection.collections[collectionName];
        if (collection) {
            await collection.drop();
            return NextResponse.json({ message: `Collection ${collectionName} deleted` }, { status: 200 });
        } else {
            return NextResponse.json({ message: `Collection ${collectionName} not found` }, { status: 404 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}