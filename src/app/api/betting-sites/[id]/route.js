import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const newSite = await prisma.bettingSite.create({
      data: {
        name: body.name,
        url: body.url,
        selectors: body.selectors,
      }
    });
    return NextResponse.json(newSite, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create betting site" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}