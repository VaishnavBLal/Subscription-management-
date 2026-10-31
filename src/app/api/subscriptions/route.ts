import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  try {
    const subscriptions = await prisma.subscription.findMany({
      where: status ? { status: status as any } : undefined,
      include: {
        customer: { select: { email: true, id: true } },
        plan: true,
        lines: { include: { product: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(subscriptions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerId, planId, startDate, expiryDate, paymentTerms, lines } = body;

    const count = await prisma.subscription.count();
    const subNumber = `SUB-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;

    const subscription = await prisma.subscription.create({
      data: {
        subNumber,
        customerId,
        planId,
        startDate: new Date(startDate),
        expiryDate: new Date(expiryDate),
        paymentTerms: paymentTerms || 'Net 30',
        status: 'DRAFT',
        lines: {
          create: lines.map((line: any) => ({
            productId: line.productId,
            quantity: line.quantity,
            unitPrice: line.unitPrice,
            taxes: line.taxes || 0,
            amount: (line.quantity * line.unitPrice) + (line.taxes || 0),
          })),
        },
      },
      include: { lines: true },
    });

    return NextResponse.json(subscription, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    const updated = await prisma.subscription.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update subscription state' }, { status: 500 });
  }
}