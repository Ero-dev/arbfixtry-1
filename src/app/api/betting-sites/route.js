import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  console.log('Saving betting site...');
  try {
    const body = await request.json();
    const newSite = await prisma.bettingSite.create({
      data: {
        name: body.name,
        url: body.url,
        selectors: body.selectors,
      },
    });
    console.log('Saved betting site:', newSite);
    return NextResponse.json(newSite, { status: 201 });
  } catch (error) {
    console.error('Error saving betting site:', error);
    return NextResponse.json(
      { error: "Failed to save betting site" },
      { status: 500 }
    );
  } finally {
    console.log('Disconnected from database');
    await prisma.$disconnect();
  }
}