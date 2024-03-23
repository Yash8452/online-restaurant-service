import connectDB from '@/dbConfig/dbConnection.js';
import Product from '@/models/product.model';
import { NextResponse, NextRequest } from 'next/server';

//works
export async function GET(req, res) {
    await connectDB();
    try {
        const products = await Product.find({});


        return NextResponse.json(
            { products, message: "All products fetched", success: true },
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
    try {
        await connectDB();
        const requestBody = await req.json();
        const { name, price } = requestBody;
        console.log(name, price)
        if (!name || !price) {
            return NextResponse.json(
                { savedProduct, message: "Product name and price required", success: false },
                { status: 401 }
            );
        }
        const newProduct = new Product({ name, price });
        const savedProduct = await newProduct.save();
        return NextResponse.json(
            { savedProduct, message: "Product added successfully", success: true },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error", success: false },
            { status: 500 }
        );
    }
}
//works
export async function PUT(req, res) {
    await connectDB();
    try {
        const url = new URL(req.url);
        const productId = url.searchParams.get("id");
        const requestBody = await req.json()
        const { name, price } = requestBody;
        const updatedProduct = await Product.findByIdAndUpdate(productId, { name, price }, { new: true });
        if (!updatedProduct) {
            return NextResponse.json(
                { message: "Product not found", success: false },
                { status: 404 }
            );

        }
        return NextResponse.json(
            { updatedProduct, message: "Product updated successfully", success: true },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error", success: false },
            { status: 500 }
        );
    }
}
//works
export async function DELETE(req, res) {
    await connectDB();
    try {
        const url = new URL(req.url);
        const productId = url.searchParams.get("id");
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return NextResponse.json(
                { message: "Product not found", success: false },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Product deleted successfully", success: true },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error", success: false },
            { status: 500 }
        );
    }
}
