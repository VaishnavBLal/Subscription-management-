import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Make sure your prisma client instance is exported from src/lib/prisma.ts

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { variants: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, type, salesPrice, costPrice, notes, variants } = body;

    const product = await prisma.product.create({
      data: {
        name,
        type,
        salesPrice: parseFloat(salesPrice),
        costPrice: parseFloat(costPrice),
        notes,
        variants: {
          create: variants?.map((v: { name: string; priceModifier: number }) => ({
            name: v.name,
            priceModifier: parseFloat(String(v.priceModifier || 0)),
          })) || [],
        },
      },
      include: { variants: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}