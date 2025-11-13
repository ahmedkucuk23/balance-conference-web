import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Test connection and create tables if needed
    await db.$executeRaw`SELECT 1`

    // Check if tables exist
    const result = await db.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'User'
      ) as exists
    ` as any[]

    if (!result[0]?.exists) {
      return NextResponse.json({
        error: 'Tables not created. Please run: npx prisma db push from a machine that can connect to Supabase'
      })
    }

    return NextResponse.json({ success: true, message: 'Database connected and tables exist' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
