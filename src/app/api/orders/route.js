import connectDB from '@/dbConfig/dbConnection.js';
import Order from '@/models/order.model';
import { NextResponse, NextRequest } from 'next/server';

//works
export async function GET(req, res) {
    await connectDB();
    try {
        const orders = await Order.find({}).populate('product_id');;
        return NextResponse.json(
            { orders, message: "All orders fetched", success: true },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error", success: false },
            { status: 500 }
        );
    }
}
//works
export async function POST(req, res) {
    await connectDB();
    try {
        const url = new URL(req.url);
        const product_id = url.searchParams.get("id");
        console.log(product_id)

        const newOrder = new Order({ product_id });
        console.log("New Order", newOrder)
        const savedOrder = await newOrder.save();
        console.log("Saved Order", savedOrder)

        return NextResponse.json(
            { savedOrder, message: "Order placed successfully", success: true },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error", success: false },
            { status: 500 }
        );
    }
}
