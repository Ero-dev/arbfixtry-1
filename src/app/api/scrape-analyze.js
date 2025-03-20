import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  console.log('Fetching opportunities...');
  try {
    const opportunities = await prisma.arbitrageOpportunities.findMany();
    console.log('Fetched opportunities:', opportunities);
    return NextResponse.json(opportunities, { status: 200 });
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return NextResponse.json(
      { error: "Failed to fetch opportunities" },
      { status: 500 }
    );
  } finally {
    console.log('Disconnected from database');
    await prisma.$disconnect();
  }
}