import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection failed');
    }
    const formData = await req.json();

    const result = await db.collection('userCollections').insertOne(formData);

    return NextResponse.json({ objectId: result.insertedId });
  } catch (error) {
    console.error('Error storing form data:', error);
    return NextResponse.json({ error: 'Failed to store form data' }, { status: 500 });
  }
}