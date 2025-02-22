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
    const { objectId, userData } = await req.json();

    if (!objectId || !userData) {
      return NextResponse.json({ error: 'objectId and userData are required' }, { status: 400 });
    }

    const result = await db.collection('userCollections').updateOne(
      { _id: ObjectId.createFromHexString(objectId) },
      { $set: userData },
      { upsert: true }
    );

    if (result.modifiedCount === 0 && result.upsertedCount === 0) {
      throw new Error('Failed to update user data');
    }

    return NextResponse.json({ message: 'User data updated successfully' });
  } catch (error) {
    console.error('Error updating user data:', error);
    return NextResponse.json({ error: 'Failed to update user data' }, { status: 500 });
  }
}