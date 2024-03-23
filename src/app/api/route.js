import connectDB from '@/dbConfig/dbConnection.js';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
    // await connectDB();
    return NextResponse.json(
        { message: "SERVER health check", success: true },
        { status: 200 }
    );
}

